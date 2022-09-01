import { FunctionComponent, PropsWithChildren } from 'react';
import styles from './ColorPicker.module.scss';

type Props = PropsWithChildren<{
  hue: string,
  colorName: string,
  hueColor: string,
  title: string,
  changeColor: (hueColor: string) => void
}>;

const ColorPicker: FunctionComponent<Props> = ({
  children,
  hue,
  colorName,
  hueColor,
  title,
  changeColor
}) => {

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