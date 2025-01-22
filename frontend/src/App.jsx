import { useState, useRef, useEffect } from 'react';
import './App.css';
import LevelImage from './components/LevelImage/LevelImage';

function App() {
  const [targetBoxCoords, setTargetBoxCoords] = useState([]);
  const imageRef = useRef(null);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.width,
        height: imageRef.current.height,
      });
    }
  }, []);

  function moveTargetBox(x, y) {
    console.log('moving target box to x, y', x, y);
    setTargetBoxCoords([x, y]);
  }

  return (
    <div>
      <h1>Where&rsquo;s Waldo?</h1>
      <LevelImage
        src={'/assets/level-images/level-1.jpg'}
        alt={'level 1 image'}
        // receives normalizedX and normalizedY
        onImageClick={(x, y) => moveTargetBox(x, y)}
        targetBoxCoords={targetBoxCoords}
        imageRef={imageRef}
      />
    </div>
  );
}

export default App;
