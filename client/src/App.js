import { createRef, useState, useEffect } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import './App.css';
import Measure from './components/Measure';
import { song1 } from './data';
import { replaceAt } from './helper';

function App() {
  const [song, setSong] = useState(song1);

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

  return (
    <div className="App">
      <div ref={ref} className="song">
        <input type="text" className='song--title' value={song.title} onChange={(event) => updateTitle(event.target.value)}/>
        <div className='song--measures'>
          {measureElements}
        </div>
      </div>
    </div>
  );
}

export default App;
