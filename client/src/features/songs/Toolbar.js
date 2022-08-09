import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { insertAt, removeAt } from '../../helper';
import { useReusableUI } from '../../ReusableUIContext'
import { getValidChords } from '../player/playerSlice';
import { getSignedInUser } from '../users/userSlice';

const useActiveElement = () => {
    const [active, setActive] = useState(document.activeElement);

    const handleFocusIn = (e) => {
        setActive(document.activeElement);
    }

    useEffect(() => {
        document.addEventListener('focusin', handleFocusIn)
        return () => {
            document.removeEventListener('focusin', handleFocusIn)
        }
    }, [])

    return active;
}

const Toolbar = ({ onSave, song, setSong }) => {
    const { setContextMenu } = useReusableUI();
    const { setAlert } = useReusableUI();
    const focusedInput = useActiveElement();
    const focusedMeasure = focusedInput?.parentElement?.parentElement?.classList[0] === 'measure'
        ? focusedInput?.parentElement?.parentElement
        : null;
    const lastFocusedMeasure = useRef();
    const validChords = useSelector(getValidChords);
    const Tone = useRef(null);
    const [playerState, setPlayerState] = useState('stopped');
    const synth = useRef(null);
    const part = useRef(null);
    const signedInUser = useSelector(getSignedInUser);
    const isCreator = Boolean(signedInUser?._id === song.userId);

    
    useEffect(() => {
        if (focusedMeasure) {
            lastFocusedMeasure.current?.lastChild?.setAttribute('data-visible', false);
            focusedMeasure.lastChild.setAttribute('data-visible', true);
            lastFocusedMeasure.current = focusedMeasure;
        }
    }, [focusedMeasure])

    const addMeasure = () => {
        const measureIndex = Number(focusedMeasure?.getAttribute('data-index'));
        setSong(prevSong => {
            return ({
                ...prevSong,
                measures: focusedMeasure
                    ? insertAt(prevSong.measures, measureIndex + 1, { id: nanoid(), chords: ['', '', '', ''] })
                    : [...prevSong.measures, { id: nanoid(), chords: ['', '', '', ''] }]
            })
        })
    }

    const removeMeasure = () => {
        const measureIndex = Number(focusedMeasure?.getAttribute('data-index'));
        setSong(prevSong => {
            return ({
                ...prevSong,
                measures: focusedMeasure
                    ? removeAt(prevSong.measures, measureIndex)
                    : prevSong.measures.slice(0, prevSong.measures.length - 1)
            })
        })
        if (focusedMeasure) {
            // focus measure that is after the removed measure if it exists
            if (lastFocusedMeasure.current.parentElement.children[measureIndex + 1]) {
                lastFocusedMeasure.current.parentElement.children[measureIndex + 1].firstChild.lastChild.focus();
            }
            // otherwise focus the measure before it
            else if (lastFocusedMeasure.current.parentElement.children[measureIndex - 1]) {
                lastFocusedMeasure.current.parentElement.children[measureIndex - 1].firstChild.lastChild.focus();
            }
        } 
    };

    const validateChords = () => {
        const invalidChords = [];
        const validChordNames = Object.keys(validChords);
        let songValid = true;

        song.measures.forEach((measure, measureIndex) => {
            measure.chords.forEach((chord, chordIndex) => {
                if (!validChordNames.includes(chord)) {
                    invalidChords.push({measureIndex, chordIndex})
                }
            })
        });

        if (invalidChords.length > 0) {
            songValid = false;
            invalidChords.forEach(chord => {
                const measure = document.querySelector(`[data-index="${chord.measureIndex}"]`);
                const input = measure.children[chord.chordIndex].lastChild;
                input.classList.add('invalid');
                setTimeout(() => {
                    input.classList.remove('invalid');
                }, 2000);
            })
        }

        if (!Number(song.bpm)) {
            songValid = false;
            document.querySelector(".song--bpm").classList.add('invalid');
            setTimeout(() => {
                document.querySelector(".song--bpm").classList.remove('invalid');
            }, 2000);
        }
        if (songValid) playSong()
        else setAlert("Invalid field(s) detected");
    }

    const playSong = async () => {
        // dynamic import to avoid audio context warnings
        if (!Tone.current) {
            Tone.current = await import('tone');
            await Tone.current.start();
            synth.current = new Tone.current.PolySynth(Tone.current.Synth).toDestination();
            synth.current.volume.value = -12;
            synth.current.set({
                envelope: {
                    attack: 0.1,
                    decay: 0.2,
                    sustain: 0.5,
                    release: 0.8,
                }
            });
        }

        if (Tone.current.Transport.state === 'started') {
            Tone.current.Transport.stop();
            setPlayerState('stopped');
        }
        else if (Tone.current.Transport.state === 'paused') {
            Tone.current.Transport.start();
            setPlayerState('started');
        }
        else if (Tone.current.Transport.state === 'stopped') {
            Tone.current.Transport.timeSignature = song.time;
            Tone.current.Transport.bpm.value = song.bpm;
            const chords = [];
            for (let i = 0; i < song.measures.length; i++) {
                for (let j = 0; j < song.time; j++) {
                    chords.push(generateChord(i, j));
                    // set duration to half note if theres no chord after
                    if (j < song.time - 1 && song.measures[i].chords[j + 1] === '') {
                        chords[chords.length - 1].duration = "2n";
                    }
                    // set duration to whole note if it's the only chord
                    if (j === 0
                        && song.measures[i].chords[j + 1] === ''
                        && song.measures[i].chords[j + 2] === ''
                        && song.measures[i].chords[j + 3] === ''
                        ) {
                        chords[chords.length - 1].duration = "1n";
                    }
                }
            }

            if (part.current) part.current.dispose();
            part.current = new Tone.current.Part(((time, value) => {
                synth.current.triggerAttackRelease(value.notes, value.duration, time);
                document.getElementById(`measure${value.measureIndex}chord${value.chordIndex}`).focus();
            }), chords).start(0);
            Tone.current.Transport.start();
            console.log(part);
            setPlayerState('started');
        }
    }

    const stopSong = () => {
        if (Tone.current) {
            Tone.current.Transport.stop();
            setPlayerState('stopped');
        }
    }

    const generateChord = (measureIndex, chordIndex) => {
        const chord = {
            time: `${measureIndex}:${chordIndex}`,
            notes: [],
            duration: "4n",
            measureIndex,
            chordIndex
        };
        for (const note of validChords[song.measures[measureIndex].chords[chordIndex]]) {
            chord.notes.push(note);
        }
        return chord;
    }

    return (
        <div className='toolbar'>
            { isCreator && <img className="toolbar--icon" src="/save-icon.png" alt="save" title="Save song" onClick={onSave}/> }
            { isCreator && <img className="toolbar--icon" src="/add-icon.png" alt="add" title="Add measure" onClick={addMeasure}/> }
            { isCreator && <img className="toolbar--icon" src="/remove-icon.png" alt="remove" title="Remove measure" onClick={removeMeasure}/> }
            { isCreator && <img className="toolbar--icon" src="/time-icon.png" alt="time" title="Set time signature" onClick={(event) => setContextMenu({
                visible: true,
                position: { x: event.clientX, y: event.clientY },
                content:
                    <div>
                        <button className="context--button" onClick={() => setSong(prev => ({ ...prev, time: 4 }))}>4/4</button>
                        <button className="context--button" onClick={() => setSong(prev => ({ ...prev, time: 3 }))}>3/4</button>
                    </div>
            })}/> }
            { playerState === 'started' 
                ? <img className="toolbar--icon" src="/stop-icon.png" alt="stop" title="Stop song" onClick={stopSong}/>
                : <img className="toolbar--icon" src="/play-icon.png" alt="play" title="Play song" onClick={validateChords}/>
            }
        </div>
    )
}

export default Toolbar