import type { FunctionComponent } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './ConfirmModal.module.scss';

type Props = {
  message: string,
  text?: string,
  handleFunction: () => void,
  closeModal: () => void
};

const ConfirmModal: FunctionComponent<Props> = ({
  message,
  text,
  handleFunction,
  closeModal
}) => {

  return (
    <div className={styles.container}>

      <div
        className={styles.behind}
        onClick={closeModal}
      ></div>

      <section className={styles.modal}>
        <p className={styles.message}>
          {message}
        </p>

        {text &&
          <p className={styles.text}>
            {text}
          </p>
        }

        <div className={styles.buttons}>

          <button
            className={`${styles.button} ${styles.confirm}`}
            type='button'
            title='Accepter'
            aria-label='Accepter'
            onClick={() => {
              handleFunction();
              closeModal();
            }}
          >
            Confirmer
          </button>

          <button
            className={`${styles.button} ${styles.cancel}`}
            type='button'
            title='Fermer'
            aria-label='Fermer'
            onClick={closeModal}
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