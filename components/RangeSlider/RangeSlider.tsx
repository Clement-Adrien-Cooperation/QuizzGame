import styles from './RangeSlider.module.scss';

type RangeSliderProps = {
  name: string,
  value: number,
  min: string,
  max: string,
  gradient: string,
  difficulty: string,
  colorDifficultyName: string,
  handleFunction: Function
};

const RangeSlider = ({
  name,
  value,
  min,
  max,
  gradient,
  difficulty,
  colorDifficultyName,
  handleFunction
} :RangeSliderProps) => {

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
        style={{color: `${colorDifficultyName}`}}
      >
        {difficulty}
      </span>
    </div>
  );
};

export default RangeSlider;