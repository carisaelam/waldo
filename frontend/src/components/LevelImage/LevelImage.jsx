import PropTypes from 'prop-types';
import { getNormalizedCoordinates } from '../../utils/CoordinateUtils';
import { useRef } from 'react';
import TargetBox from '../TargetBox/TargetBox';
import style from './LevelImage.module.css';

export default function LevelImage({
  src,
  alt,
  onImageClick = () => {},
  targetBoxCoords = [0, 0],
}) {
  const imageRef = useRef(null);

  function handleClick(e) {
    const { normalizedX, normalizedY } = getNormalizedCoordinates(e);
    onImageClick(normalizedX, normalizedY);
  }

  return (
    <div className={style.level__image__container}>
      <img
        ref={imageRef}
        data-testid="level-image-1"
        onClick={handleClick}
        src={src || 'https://placehold.co/400'}
        alt={alt}
      />
      <TargetBox
        x={targetBoxCoords[0]}
        y={targetBoxCoords[1]}
        imageRef={imageRef}
      />
    </div>
  );
}

LevelImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onImageClick: PropTypes.func,
  targetBoxCoords: PropTypes.array,
};
