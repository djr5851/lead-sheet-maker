import { createRef, useState, useEffect } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import './App.css';
import Measure from './components/Measure';

function App() {
  const [measures, setMeasures] = useState([]);

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

  // hardcode measures
  useEffect(() => {
    const measureData = [];
    for (let i = 0; i < 16; i++) {
      measureData.push({id: i, beats: 4})
    };
    setMeasures(measureData);
  }, []);
  
  const measureElements = measures.map(measure => {
    console.log(measure);
    return (<Measure key={measure.id} beats={measure.beats} />)
  });

  return (
    <div className="App">
      <div ref={ref} className="measures">
        {measureElements}
      </div>
    </div>
  );
}

export default App;
