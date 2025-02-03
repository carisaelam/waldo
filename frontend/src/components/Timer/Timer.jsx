import { useEffect, useState } from 'react';

export function Timer({ hasWon }) {
  const [running, setRunning] = useState(true);
  console.log('hasWon in timer', hasWon);

  function handleStop() {
    console.log('handling stop ');
    setRunning(false);
  }

  return (
    <div data-testid="timer">
      <h2>{running && 'running'}</h2>
      <button data-testid="stop_button" onClick={handleStop}>
        hi
      </button>
    </div>
  );
}
