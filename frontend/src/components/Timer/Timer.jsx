import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export function Timer({ hasWon, onTimerStop }) {
  const [running, setRunning] = useState(true);
  const [seconds, setSeconds] = useState(0);
  console.log('hasWon in timer', hasWon);

  useEffect(() => {
    if (hasWon) {
      onTimerStop(seconds);
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [hasWon]);

  return <div data-testid="timer">{seconds} seconds</div>;
}

Timer.propTypes = {
  hasWon: PropTypes.bool,
  onTimerStop: PropTypes.func,
};
