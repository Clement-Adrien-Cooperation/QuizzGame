import styles from './CheckButton.module.scss';

type CheckButtonProps = {
  state: boolean,
  clickFunction: Function
};

const CheckButton = ({
  state,
  clickFunction
} :CheckButtonProps) => {

  return (
    <>
      <input
        className={styles.input}
        type='checkbox'
        id='switch'
        checked={state}
        readOnly
      />

      <label
        className={styles.label}
        htmlFor="switch"
        onClick={() => clickFunction()}
      ></label>
    </>
  );
};

export default CheckButton;