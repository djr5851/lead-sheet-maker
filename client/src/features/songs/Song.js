import Measure from './Measure';
import { replaceAt } from '../../helper';
import { createRef, useState } from 'react';
import { createFileName, useScreenshot } from 'use-react-screenshot';
import { song1 } from '../../data'
import { useDispatch, useSelector } from 'react-redux';
import { createSong } from './songsSlice';
import { selectAllUsers } from '../users/usersSlice';

const Song = () => {
    const [song, setSong] = useState(song1);
    const [saveRequestStatus, setSaveRequestStatus] = useState('idle');
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();

    const updateChords = (measureID, newChord, index) => {
        setSong(prevSong => {
            return ({
            ...prevSong,
            measures: prevSong.measures.map(measure => (
                measure.id === measureID ?
                {...measure, chords: replaceAt(measure.chords, index, newChord)} :
                measure
            ))
            });
        });
    };
    
    const updateTitle = (newTitle) => {
        setSong(prevSong => ({...prevSong, title: newTitle}));
    };

    const updateUserId = (newUserId) => {
        setSong(prevSong => ({...prevSong, userId: newUserId}));
    };

    const measureElements = song.measures.map(measure => {
        return (<Measure key={measure.id} id={measure.id} beats={measure.beats} chords={measure.chords} updateChords={updateChords}/>);
    });

    const canSave = [song.title, song.measures].every(Boolean) && saveRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setSaveRequestStatus('pending');
                dispatch(createSong({ title: song.title, userId: song.userId, measures: song.measures })).unwrap();
            } catch (err) {
                console.error('Failed to save the post', err);
            } finally {
                setSaveRequestStatus('idle');
            }
        }
    };

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    // set up export functionality
    const ref = createRef(null);
    const [image, takeScreenShot] = useScreenshot({
        type: "image/jpeg",
        quality: 1.0
    });
    const download = (image, { name = "img", extension = "jpg" } = {}) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = createFileName(extension, name);
        a.click();
    };
    const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

    return (
        <div>
            <select id="postAuthor" value={song.userId} onChange={(event) => updateUserId(event.target.value)}>
                    <option value=""></option>
                    {usersOptions}
            </select>
            <div ref={ref} className="song">
            <input type="text" className='song--title' value={song.title} onChange={(event) => updateTitle(event.target.value)}/>
            <div className='song--measures'>
                {measureElements}
            </div>
            <button type="button" onClick={onSavePostClicked} disabled={!canSave}>Save Song</button>
            </div>
        </div>
      )
}

export default Song