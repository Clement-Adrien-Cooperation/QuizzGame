import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import styles from './TextArea.module.scss';

type Props = {
  inputID: string,
  label: string,
  state: string,
  setState: Dispatch<SetStateAction<string>>,
  title: string,
  required: boolean
};

const TextArea: FunctionComponent<Props> = ({
  inputID,
  label,
  state,
  setState,
  title,
  required
}) => {

  return (
    <div className={styles.field}>

      <textarea
        className={styles.input}
        title={title}
        aria-label={title}
        value={state}
        id={inputID}
        required={required}
        onChange={e => setState(e.target.value)}
      />

      <label
        htmlFor={inputID}
        className={styles.label}
      >
        {label}
      </label>

    </div>
  );
};

export default TextArea;