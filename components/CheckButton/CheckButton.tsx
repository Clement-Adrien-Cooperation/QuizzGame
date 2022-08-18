import styles from './CheckButton.module.scss';

type CheckButtonProps = {
  state: boolean,
  title: string,
  clickFunction: Function
};

const CheckButton = ({
  state,
  title,
  clickFunction
} :CheckButtonProps) => {

  return (
    <>
      <input
        className={styles.input}
        type='checkbox'
        title={title}
        aria-label={title}
        id='switch'
        checked={state}
        readOnly
      />

      <label
        className={styles.label}
        title={title}
        aria-label={title}
        htmlFor="switch"
        onClick={() => clickFunction()}
      ></label>
    </>
  );
};

export default CheckButton;