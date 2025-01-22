import PropTypes from 'prop-types';
import { getNormalizedCoordinates } from '../../utils/CoordinateUtils';

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
    <div>
      <img
        data-testid="level-image-1"
        onClick={handleClick}
        src={src || 'https://placehold.co/400'}
        alt={alt}
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
