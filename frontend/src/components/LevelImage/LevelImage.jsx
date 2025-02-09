import PropTypes from 'prop-types';
import { getNormalizedCoordinates } from '../../utils/CoordinateUtils';
import { useRef, useState, useEffect } from 'react';
import TargetBox from '../TargetBox/TargetBox';
import { Timer } from '../Timer/Timer';
import style from './LevelImage.module.css';

export default function LevelImage({
  src,
  alt,
  onImageClick = () => {},
  targetBoxCoords = [0, 0],
}) {
  const imageRef = useRef(null);
  const [imageElement, setImageElement] = useState(null);
  const [levelCharacters, setLevelCharacters] = useState([]);
  const [hasWon, setHasWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [finalTime, setFinalTime] = useState(null);

  const level = 1;

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await fetch(
          `http://localhost:3000/characters?level=${level}`
        );
        const data = await response.json();
        setLevelCharacters(data);
      } catch (error) {
        console.error('Error fetching characters: ', error);
      }
    }

    fetchCharacters();
  }, [level]);

  // console.log('levelCharacters: ', levelCharacters);
  // console.log('hasWon', hasWon);

  useEffect(() => {
    if (imageRef.current) {
      setImageElement(imageRef.current);
    }
  }, []);

  function handleClick(e) {
    const { normalizedX, normalizedY } = getNormalizedCoordinates(e);
    setStarted(true);
    onImageClick(normalizedX, normalizedY);
  }

  function handleCharacterFound(characterId) {
    setLevelCharacters((prevChars) =>
      prevChars.map((char) =>
        char.id === characterId ? { ...char, is_found: true } : char
      )
    );
  }

  useEffect(() => {
    if (!started) return;

    const allCharactersFound = levelCharacters.every(
      (char) => char.is_found === true
    );

    // console.log('allCharactersFound', allCharactersFound);

    if (allCharactersFound) {
      setHasWon(true);
    }
  }, [levelCharacters, started]);

  function handleTimerStop(time) {
    setFinalTime(time);
  }

  return (
    <>
      <div className={style.level__image__header}>
        <h1 className={style.header} data-testid="title">
          Where&rsquo;s Waldo?
        </h1>
        <Timer hasWon={hasWon} onTimerStop={handleTimerStop} />
        {hasWon && (
          <h2 className={hasWon ? style.won : ''}>
            You won in {finalTime} seconds
          </h2>
        )}
      </div>
      <div className={style.level__image}>
        <ul className={style.character__headshot__container}>
          {levelCharacters.map((char) => {
            return (
              <li
                data-testid="character-headshot"
                key={char.id}
                className={style.character__headshot}
              >
                <img src={char.img.src} alt={char.img.alt} />
                <p className={char.is_found ? style.found : ''}>
                  {char.is_found ? '✅ ' : ''}
                  {char.name}
                </p>
              </li>
            );
          })}
        </ul>

        <div className={style.level__image__container}>
          <img
            ref={imageRef}
            data-testid="level-image-1"
            onClick={handleClick}
            src={src || 'https://placehold.co/400'}
            alt={alt}
          />
          {started && targetBoxCoords && (
            <TargetBox
              data-testid="target-box"
              x={targetBoxCoords[0]}
              y={targetBoxCoords[1]}
              imageElement={imageElement}
              onCharacterFound={handleCharacterFound}
              levelCharacters={levelCharacters}
            />
          )}
        </div>
      </div>
    </>
  );
}

LevelImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onImageClick: PropTypes.func,
  targetBoxCoords: PropTypes.array,
};
