import style from './TargetBox.module.css';

export default function TargetBox() {
  return (
    <div
      className={style.target__box__container}
      data-testid="target-box"
    ></div>
  );
}
