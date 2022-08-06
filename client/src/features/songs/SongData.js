import Measure from './Measure';
import { replaceAt } from '../../helper';
import { createRef, useState } from 'react';
// import { createFileName, useScreenshot } from 'use-react-screenshot';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from './Toolbar';
import { updateSong } from './songsSlice';
import { getSignedInUser } from '../users/userSlice';

const SongData = ({ loadedSong, setContextMenu }) => {
    const [song, setSong] = useState(loadedSong);
    const signedInUser = useSelector(getSignedInUser);
    const dispatch = useDispatch();
    const isCreator = Boolean(signedInUser?._id === song.userId);

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
    
    const updateArtist = (newArtist) => {
        setSong(prevSong => ({...prevSong, artist: newArtist}));
    };

    const measureElements = song.measures.map(measure => {
        return (<Measure
                    key={ measure.id }
                    id={ measure.id }
                    time={ song.time } 
                    chords={ measure.chords }
                    updateChords={ updateChords }
                    disabled={ !isCreator }
                />);
    });


    // set up export functionality
    const ref = createRef(null);
    // const [image, takeScreenShot] = useScreenshot({
    //     type: "image/jpeg",
    //     quality: 1.0
    // });

    // const download = (image, { name = "img", extension = "jpg" } = {}) => {
    //     const a = document.createElement("a");
    //     a.href = image;
    //     a.download = createFileName(extension, name);
    //     a.click();
    // };
    
    // const downloadScreenshot = () => takeScreenShot(ref.current).then(download);
 
    return (
        <div>
            { isCreator && <Toolbar onSave={onSave} setSong={ setSong } setContextMenu={ setContextMenu } /> }
            <div ref={ref} className="song">
                <input type="text" className='song--title' value={song.title} disabled={!isCreator} onChange={(event) => updateTitle(event.target.value)}/>
                <input type="text" className='song--artist' value={song.artist} onChange={(event) => updateArtist(event.target.value)}/>
                <div className='song--body'>
                    <div className='song--time'>
                        <h2>{song.time}</h2>
                        <h2>—</h2>
                        <h2>4</h2>
                    </div>
                    <div key='measures' className='song--measures'>
                        {measureElements}
                    </div>
                </div>
            </div>
        </div>
      )
}

export default SongData