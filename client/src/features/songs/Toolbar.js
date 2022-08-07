import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { insertAt, removeAt } from '../../helper';
import { useReusableUI } from '../../ReusableUIContext'

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

const Toolbar = ({ onSave, setSong }) => {
    const { setContextMenu } = useReusableUI();
    const focusedInput = useActiveElement();
    const focusedMeasure = focusedInput?.parentElement?.parentElement?.classList[0] === 'measure'
        ? focusedInput?.parentElement?.parentElement
        : null;
    const [lastFocusedMeasure, setLastFocusedMeasure] = useState();
    
    useEffect(() => {
        if (focusedMeasure) {
            lastFocusedMeasure?.lastChild?.setAttribute('data-visible', false);
            focusedMeasure.lastChild.setAttribute('data-visible', true);
            setLastFocusedMeasure(focusedMeasure);
        }
    }, [focusedMeasure, lastFocusedMeasure])

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
            if (lastFocusedMeasure.parentElement.children[measureIndex + 1]) {
                lastFocusedMeasure.parentElement.children[measureIndex + 1].firstChild.lastChild.focus();
            }
            // otherwise focus the measure before it
            else if (lastFocusedMeasure.parentElement.children[measureIndex - 1]) {
                lastFocusedMeasure.parentElement.children[measureIndex - 1].firstChild.lastChild.focus();
            }
        } 
    };


    return (
        <div className='toolbar'>
            <img className="toolbar--icon" src="/save-icon.png" alt="save" title="Save song" onClick={onSave}/>
            <img className="toolbar--icon" src="/add-icon.png" alt="save" title="Add measure" onClick={addMeasure}/>
            <img className="toolbar--icon" src="/remove-icon.png" alt="save" title="Remove measure" onClick={removeMeasure}/>
            <img className="toolbar--icon" src="/time-icon.png" alt="time" title="Set time signature" onClick={(event) => setContextMenu({
                visible: true,
                position: { x: event.clientX, y: event.clientY },
                content:
                    <div>
                        <button className="context--button" onClick={() => setSong(prev => ({ ...prev, time: 4 }))}>4/4</button>
                        <button className="context--button" onClick={() => setSong(prev => ({ ...prev, time: 3 }))}>3/4</button>
                    </div>
            })}/>
        </div>
    )
}

export default Toolbar