import style from './TargetBox.module.css';
import PropTypes from 'prop-types';

export default function TargetBox({ x, y, imageRef }) {
  const imageWidth = imageRef?.current?.naturalWidth;
  const imageHeight = imageRef?.current?.naturalHeight;

  return (
    <div
      style={{
        top: `${(y / imageHeight) * 100}%`,
        left: `${(x / imageWidth) * 100}%`,
      }}
      className={style.target__box}
      data-testid="target-box"
    ></div>
  );
}

TargetBox.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  imageRef: PropTypes.object,
};
