import type { ChangeEventHandler, FunctionComponent } from 'react';
import styles from './RangeSlider.module.scss';

type Props = {
  name: string,
  value: number,
  min: string,
  max: string,
  gradient: string,
  difficulty: string,
  color: string,
  handleFunction: ChangeEventHandler<HTMLInputElement>
};

const RangeSlider: FunctionComponent<Props> = ({
  name,
  value,
  min,
  max,
  gradient,
  difficulty,
  color,
  handleFunction
}) => {

  return (
    <div className={styles.slideContainer}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {name}
      </label>

      <input
        style={{background: gradient}}
        type='range'
        min={min}
        max={max}
        value={value}
        id={name}
        className={styles.slider}
        onChange={(e) => handleFunction(e)}
      />

      <span
        className={styles.span}
        style={{background: `var(--${color})`}}
      >
        {difficulty}
      </span>
    </div>
  );
};

export default RangeSlider;