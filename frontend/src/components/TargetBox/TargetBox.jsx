import style from './TargetBox.module.css';
import PropTypes from 'prop-types';

export default function TargetBox({ x, y, imageRef }) {
  console.log('targetBox... x, y', x, y);

  const imageWidth = imageRef?.current?.naturalWidth;
  const imageHeight = imageRef?.current?.naturalHeight;

  return (
    <div
      style={{
        top: `${(y / imageHeight) * 100}%`,
        left: `${(x / imageWidth) * 100}%`,
        transform: 'translate(-50%, -50%)',
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
