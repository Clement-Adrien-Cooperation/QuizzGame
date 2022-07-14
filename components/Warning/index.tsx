import styles from './Warning.module.scss';

const Warning = ({
  warningMessage,
  setWarningMessage
}: {
  warningMessage: string,
  setWarningMessage: Function
}) => {

  return (
    <div className={styles.warning}>
      <p className={styles.warning__message}>
        {warningMessage}
      </p>
      <button
        className={styles.warning__button}
        onClick={() => setWarningMessage('')}
      >
        &times;
      </button>
    </div>
  );
};

export default Warning;