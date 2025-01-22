import PropTypes from 'prop-types';
import { getNormalizedCoordinates } from '../../utils/CoordinateUtils';
import TargetBox from '../TargetBox/TargetBox';
import style from './LevelImage.module.css';

export default function LevelImage({
  src,
  alt,
  onImageClick = () => {},
  targetBoxCoords = [0, 0],
}) {
  console.log('targetBoxCoords in LevelImage', targetBoxCoords);

  function handleClick(e) {
    const { normalizedX, normalizedY } = getNormalizedCoordinates(e);

    console.log('normalizedX', normalizedX);
    console.log('normalizedY', normalizedY);

    onImageClick(normalizedX, normalizedY);
  }

  return (
    <div className={style.level__image__container}>
      <img
        data-testid="level-image-1"
        onClick={handleClick}
        src={src || 'https://placehold.co/400'}
        alt={alt}
      />
      <TargetBox />
    </div>
  );
}

LevelImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  onImageClick: PropTypes.func,
  targetBoxCoords: PropTypes.array,
};
