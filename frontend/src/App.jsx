import './App.css';
import LevelImage from './components/LevelImage/LevelImage';

function App() {
  function moveTargetBox(x, y) {
    console.log('moving target box to x, y', x, y);
  }
  
  return (
    <div>
      <h1>Where&rsquo;s Waldo?</h1>
      <LevelImage
        src={'/assets/level-images/level-1.jpg'}
        alt={'level 1 image'}
        // receives normalizedX and normalizedY
        onImageClick={(x, y) => moveTargetBox(x, y)}
      />
      ;
    </div>
  );
}

export default App;
