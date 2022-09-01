import { ChangeEventHandler, FunctionComponent } from 'react';
import styles from './InputField.module.scss';

type Props = {
  name: string,
  state: string,
  inputID: string,
  type: string,
  isDisabled: boolean,
  required: boolean,
  autoFocus: boolean,
  handleFunction: ChangeEventHandler<HTMLInputElement>
};

const InputField: FunctionComponent<Props> = ({
  name,
  state,
  inputID,
  type,
  isDisabled,
  required,
  autoFocus,
  handleFunction,
}) => {

  return (
    <div className={styles.field}>

      <input
        className={styles.input}
        type={type}
        id={inputID}
        value={state}
        onChange={handleFunction}
        disabled={isDisabled}
        required={required}
        autoFocus={autoFocus}
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