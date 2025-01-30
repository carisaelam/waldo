import { useState, useRef } from 'react';
import './App.css';
import LevelImage from './components/LevelImage/LevelImage';

function App() {
  const [targetBoxCoords, setTargetBoxCoords] = useState([]);
  const imageRef = useRef(null);

  return (
    <div>
      <h1 data-testid="title">Where&rsquo;s Waldo?</h1>
      <LevelImage
        src={'/assets/level-images/level-1.jpg'}
        alt={'level 1 image'}
        onImageClick={(x, y) => setTargetBoxCoords([x, y])}
        targetBoxCoords={targetBoxCoords}
        imageRef={imageRef}
      />
    </div>
  );
}

export default App;
