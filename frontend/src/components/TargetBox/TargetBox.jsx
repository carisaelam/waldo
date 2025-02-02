import style from './TargetBox.module.css';
import PropTypes from 'prop-types';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import { useState, useEffect } from 'react';

export default function TargetBox({
  x,
  y,
  imageElement,
  onCharacterFound,
  levelCharacters,
}) {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  console.log('targetbox level characters', levelCharacters);

  useEffect(() => {
    const updateDimensions = () => {
      if (imageElement) {
        const newDimensions = {
          width: imageElement.offsetWidth,
          height: imageElement.offsetHeight,
        };
        setImageDimensions(newDimensions);
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [imageElement, x, y]);

  if (
    !imageElement ||
    imageDimensions.width === 0 ||
    imageDimensions.height === 0
  ) {
    return null;
  }
  return (
    <div
      style={{
        top: `${y * imageDimensions.height}px`,
        left: `${x * imageDimensions.width}px`,
      }}
      className={style.target__box}
      data-testid="target-box"
    >
      <DropdownMenu
        targetBoxCoords={[x, y]}
        onCharacterFound={onCharacterFound}
        levelCharacters={levelCharacters}
      />
    </div>
  );
}

TargetBox.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  imageElement: PropTypes.object,
  onCharacterFound: PropTypes.func,
  levelCharacters: PropTypes.array,
};
