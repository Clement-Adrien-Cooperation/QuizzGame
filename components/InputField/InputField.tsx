import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { useRef } from 'react';
import styles from './InputField.module.scss';

type Props = {
  name: string,
  state: string,
  inputID: string,
  type: string,
  isDisabled: boolean,
  required: boolean,
  autoFocus: boolean,
  setState: Dispatch<SetStateAction<string>>
};

const InputField: FunctionComponent<Props> = ({
  name,
  state,
  inputID,
  type,
  isDisabled,
  required,
  autoFocus,
  setState
}) => {

  const inputRef: any = useRef<HTMLInputElement>(null);

  const erase = () => {
    inputRef.current.focus();
    setState('');
  };

  return (
    <div className={styles.field}>

      <input
        className={styles.input}
        ref={inputRef}
        type={type}
        id={inputID}
        value={state}
        onChange={e => setState(e.target.value)}
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

      <button
        className={styles.delete}
        type="button"
        title="Effacer"
        tabIndex={-1}
        aria-label="Effacer la saisie"
        onClick={erase}
      >
        &times;
      </button>

    </div>
  );
};

export default InputField;