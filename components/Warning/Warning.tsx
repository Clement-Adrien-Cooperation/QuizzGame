import styles from './Warning.module.scss';

type WarningProps = {
  warningMessage: string,
  setWarningMessage: Function
};

const Warning = ({ warningMessage, setWarningMessage }: WarningProps) => {

  return (
    <div className={styles.warning}>

      <p className={styles.warning__message}>
        {warningMessage}
      </p>

      <button
        aria-label='Fermer'
        className={styles.warning__button}
        onClick={() => setWarningMessage('')}
      >
        &times;
      </button>
      
    </div>
  );
};

export default Warning;