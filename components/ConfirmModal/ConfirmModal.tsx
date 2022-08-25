import CloseButton from '../CloseButton/CloseButton';
import styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  message: string,
  text?: string,
  handleFunction: Function,
  closeModal: Function
};

const ConfirmModal = ({
  message,
  handleFunction,
  text,
  closeModal
}: ConfirmModalProps) => {

  return (
    <div className={styles.container}>

      <div
        className={styles.behind}
        onClick={() => closeModal()}
      ></div>

      <section className={styles.modal}>
        <p className={styles.message}>
          {message}
        </p>

        {text && (
          <p className={styles.text}>
            {text}
          </p>
        )}

        <div className={styles.buttons}>

          <button
            className={`${styles.button} ${styles.confirm}`}
            title='Accepter'
            aria-label='Accepter'
            onClick={() => handleFunction}
          >
            Confirmer
          </button>

          <button
            className={`${styles.button} ${styles.cancel}`}
            title='Fermer'
            aria-label='Fermer'
            onClick={() => closeModal}
          >
            Annuler
          </button>
        </div>

        <CloseButton
          handleFunction={closeModal}
        />
      </section>
    </div>
  );
};

export default ConfirmModal;