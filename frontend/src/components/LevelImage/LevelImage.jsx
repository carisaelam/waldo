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

  console.log('levelCharacters: ', levelCharacters);

  useEffect(() => {
    if (imageRef.current) {
      setImageElement(imageRef.current);
    }
  }, []);

  function handleClick(e) {
    const { normalizedX, normalizedY } = getNormalizedCoordinates(e);
    onImageClick(normalizedX, normalizedY);
  }

  function handleCharacterFound(characterId) {
    console.log('running handleCharacterFound in LevelImage: ', characterId);

    setLevelCharacters((prevChars) =>
      prevChars.map((char) =>
        char.id === characterId ? { ...char, isFound: true } : char
      )
    );
  }

  useEffect(() => {
    const allCharactersFound = levelCharacters.every((char) => char.isFound);

    console.log('all characaters, ', levelCharacters);

    console.log('won? ', allCharactersFound);

    allCharactersFound && setHasWon(true);
  }, [levelCharacters]);
  return (
    <div>
      <h2 className={hasWon ? style.won : ''}>won?</h2>
      <ul>
        Who is here:
        {levelCharacters.map((char) => {
          return (
            <li className={char.isFound ? style.found : ''} key={char.id}>
              {char.name}
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
        <TargetBox
          data-testid="target-box"
          x={targetBoxCoords[0]}
          y={targetBoxCoords[1]}
          imageElement={imageElement}
          onCharacterFound={handleCharacterFound}
          levelCharacters={levelCharacters}
        />
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
