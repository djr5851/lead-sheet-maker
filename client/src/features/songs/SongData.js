import Measure from './components/Measure';
import { replaceAt } from '../../helper';
import { createRef, useState } from 'react';
import { createFileName, useScreenshot } from 'use-react-screenshot';
import { useDispatch } from 'react-redux';
import Toolbar from './Toolbar';
import { updateSong } from './songsSlice';

const SongData = ({ loadedSong }) => {
    const [song, setSong] = useState(loadedSong);
    const dispatch = useDispatch();

    const onSave = () => {
        dispatch(updateSong({ id: song._id, newSong: song }));
    }

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

    const measureElements = song.measures.map(measure => {
        return (<Measure key={measure.id} id={measure.id} beats={measure.beats} chords={measure.chords} updateChords={updateChords}/>);
    });


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
            <Toolbar onSave={onSave} />
            <div ref={ref} className="song">
                <input type="text" className='song--title' value={song.title} onChange={(event) => updateTitle(event.target.value)}/>
                <div className='song--measures'>
                    {measureElements}
                </div>
            </div>
        </div>
      )
}

export default SongData