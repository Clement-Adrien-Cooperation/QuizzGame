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
            onClick={() => handleFunction}
          >
            Confirmer
          </button>

          <button
            className={styles.buttons__cancel}
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