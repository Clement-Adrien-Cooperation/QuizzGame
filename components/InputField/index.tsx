import { ChangeEventHandler } from 'react';
import styles from './InputField.module.scss';

type InputFieldProps = {
  name: string,
  state: string,
  inputID: string,
  type: string,
  isDisabled: boolean,
  handleFunction: ChangeEventHandler<HTMLInputElement>
};

const InputField = ({
  name,
  state,
  inputID,
  type,
  isDisabled,
  handleFunction,
} : InputFieldProps) => {

  return (
    <div className={styles.field}>

      <input
        className={styles.input}
        type={type}
        id={inputID}
        value={state}
        onChange={handleFunction}
        disabled={isDisabled}
        required
      />

      <label
        htmlFor={inputID}
        className={styles.label}
      >
        {name}
      </label>
      
    </div>
  );
};

export default InputField;