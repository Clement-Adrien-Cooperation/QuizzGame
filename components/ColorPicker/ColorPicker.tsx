import styles from './ColorPicker.module.scss';

type ColorPickerProps = {
  children: any,
  hue: string,
  colorName: string,
  hueColor: string,
  title: string,
  changeColor: Function
};

const ColorPicker = ({
  children,
  hue,
  colorName,
  hueColor,
  title,
  changeColor
} : ColorPickerProps) => {

  return (
    <>
      <input
        className={styles.input}
        type='radio'
        name='color'
        id={colorName}
        title={title}
        aria-label={title}
        defaultChecked={hue === hueColor ? true : false}
        readOnly
      />
      
      <label
        className={styles.picker}
        htmlFor={colorName}
        title={title}
        aria-label={title}
        onClick={() => {changeColor(hueColor)}}
      >
        {children}
      </label>
    </>
  );
};

export default ColorPicker;