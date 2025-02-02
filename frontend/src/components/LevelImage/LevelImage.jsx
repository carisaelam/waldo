import PropTypes from 'prop-types';
import { getNormalizedCoordinates } from '../../utils/CoordinateUtils';
import { useRef, useState, useEffect } from 'react';
import TargetBox from '../TargetBox/TargetBox';
import style from './LevelImage.module.css';
import { CHARACTERS } from '../characters';

export default function LevelImage({
  src,
  alt,
  onImageClick = () => {},
  targetBoxCoords = [0, 0],
}) {
  const imageRef = useRef(null);
  const [imageElement, setImageElement] = useState(null);
  const [levelCharacters, setLevelCharacters] = useState(CHARACTERS.level1);

  const [hasWon, setHasWon] = useState(false);
  const [started, setStarted] = useState(false);

  console.log('levelCharacters: ', levelCharacters);

  useEffect(() => {
    console.log('started state changed: ', started);
  }, [started]);

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
        char.id === characterId ? { ...char, isFound: true } : char
      )
    );

    setStarted(false);
  }

  useEffect(() => {
    const allCharactersFound = levelCharacters.every((char) => char.isFound);

    allCharactersFound && setHasWon(true);
  }, [levelCharacters]);
  return (
    <div className={style.level__image}>
      <h2 hidden className={hasWon ? style.won : ''}>
        You won!
      </h2>
      <ul className={style.character__headshot__container}>
        {levelCharacters.map((char) => {
          return (
            <li
              data-testid="character-headshot"
              key={char.id}
              className={style.character__headshot}
            >
              <img src={char.img.src} alt={char.img.alt} />
              <p className={char.isFound ? style.found : ''}>
                {char.isFound ? '✅ ' : ''}
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
  );
}

LevelImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onImageClick: PropTypes.func,
  targetBoxCoords: PropTypes.array,
};
