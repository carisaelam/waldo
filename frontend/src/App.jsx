import './App.css';
import LevelImage from './components/LevelImage/LevelImage';

function App() {
  return (
    <div>
      <h1>Where&rsquo;s Waldo?</h1>
      <LevelImage
        src={'/assets/level-images/level-1.jpg'}
        alt={'level 1 image'}
      />
      ;
    </div>
  );
}

export default App;
