import { FunctionComponent, ChangeEventHandler } from 'react';
import styles from './TextArea.module.scss';

type Props = {
  inputID: string,
  label: string,
  state: string,
  handleFunction: ChangeEventHandler<HTMLTextAreaElement>,
  title: string
};

const TextArea: FunctionComponent<Props> = ({
  inputID,
  label,
  state,
  handleFunction,
  title
}) => {

  return (
    <div className={styles.field}>

      <textarea
        className={styles.input}
        title={title}
        aria-label={title}
        value={state}
        id={inputID}
        required={true}
        onChange={handleFunction}
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