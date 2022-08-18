import CloseButton from '../CloseButton/CloseButton';
import styles from './ConfirmModal.module.scss';

type ConfirmModalProps = {
  message: string,
  handleFunction: Function,
  closeModal: Function
};

const ConfirmModal = ({ message, handleFunction, closeModal } :ConfirmModalProps) => {

  return (
    <div className={styles.container}>
      <section className={styles.modal}>
        <p className={styles.message}>
          {message}
        </p>

        <div className={styles.buttons}>

          <button
            className={styles.buttons__confirm}
            title='Accepter'
            aria-label='Accepter'
            onClick={() => handleFunction}
          >
            Confirmer
          </button>

          <button
            className={styles.buttons__cancel}
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