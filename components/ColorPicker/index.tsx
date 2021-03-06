import styles from './ColorPicker.module.scss';

type ColorPickerProps = {
  children: any,
  hue: string,
  colorName: string,
  hueColor: string,
  changeColor: Function
};

const ColorPicker = ({
  children,
  hue,
  colorName,
  hueColor,
  changeColor
} : ColorPickerProps) => {

  return (
    <>
      <input
        className={styles.input}
        type='radio'
        name='color'
        id={colorName}
        defaultChecked={hue === hueColor ? true : false}
        readOnly
      />
      
      <label
        className={styles.picker}
        htmlFor={colorName}
        onClick={() => {changeColor(hueColor)}}
      >
        {children}
      </label>
    </>
  );
};

export default ColorPicker;