import type { FunctionComponent, Dispatch, SetStateAction } from 'react'
import { Notification } from '@prisma/client';
import styles from './NotificationModal.module.scss';
import Modal from '../../Modal/Modal';

type Props = {
  currentNotification: Notification,
  setShowCurrentNotification: Dispatch<SetStateAction<boolean>>
};

const NotificationModal: FunctionComponent<Props> = ({
  currentNotification,
  setShowCurrentNotification
}) => {

  return (
    <Modal
      setShowModal={setShowCurrentNotification}
    >
      <article className={styles.card}>
        <header className={styles.header}>
          <h2>
            {currentNotification.title}
          </h2>
        </header>

        <p className={styles.content}>
          {currentNotification.message}
        </p>

        <footer className={styles.footer}>
          <span>
            Le {currentNotification.date}
          </span>
        </footer>

      </article>
    </Modal>
  );
};

export default NotificationModal;