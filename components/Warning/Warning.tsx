import styles from './Warning.module.scss';

type WarningProps = {
  warningMessage: string,
  setWarningMessage: React.Dispatch<React.SetStateAction<string>>
};

const Warning = ({ warningMessage, setWarningMessage }: WarningProps) => {

  return (
    <div className={styles.warning}>

      <p className={styles.warning__message}>
        {warningMessage}
      </p>

      <button
        className={styles.warning__button}
        type='button'
        title='Fermer'
        aria-label='Fermer'
        onClick={() => setWarningMessage('')}
      >
        &times;
      </button>
      
    </div>
  );
};

export default Warning;