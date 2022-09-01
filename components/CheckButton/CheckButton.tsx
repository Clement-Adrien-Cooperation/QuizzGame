import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import styles from './CheckButton.module.scss';

type Props = {
  label: string,
  id: string,
  title: string,
  state: boolean,
  setState: Dispatch<SetStateAction<boolean>>
};

const CheckButton: FunctionComponent<Props> = ({
  label,
  id,
  title,
  state,
  setState
}) => {

  return (
    <div className={styles.checkbox}>
      <input
        className={styles.input}
        type='checkbox'
        title={title}
        aria-label={title}
        id={id}
        checked={state}
        readOnly
        onClick={() => setState(!state)}
      />

      <label
        className={styles.label}
        title={title}
        aria-label={title}
        htmlFor={id}
      ></label>

      <p
        className={styles.text}
        onClick={() => setState(!state)}
      >
        {label}
      </p>
    </div>
  );
};

export default CheckButton;