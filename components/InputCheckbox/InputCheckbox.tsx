import styles from './InputCheckbox.module.scss';

type InputCheckboxProps = {
  label: string,
  id: string,
  handleFunction: Function
};

const InputCheckbox = ({
  label,
  id,
  handleFunction
}: InputCheckboxProps) => {

  return (
    <div
      className={styles.checkbox}
      onClick={() => handleFunction()}
    >

      <input
        className={styles.input}
        type='checkbox'
        id={id}
      />

      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>

    </div>
  );
};

export default InputCheckbox;