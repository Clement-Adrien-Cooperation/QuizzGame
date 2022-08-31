import styles from './CheckButton.module.scss';

type CheckButtonProps = {
  label: string,
  id: string,
  title: string,
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
};

const CheckButton = ({
  label,
  id,
  title,
  state,
  setState
}: CheckButtonProps) => {

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