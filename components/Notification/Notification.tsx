import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './Notification.module.scss';

type Props = {
  notification: string,
  setNotification: Dispatch<SetStateAction<string>>
};

const Notification: FunctionComponent<Props> = ({
  notification,
  setNotification
}) => {

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);

    const timeoutID = setTimeout(() => {
      closeNotification();
    }, 5000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const closeNotification = () => {
    setOpened(false);

    setTimeout(() => {
      setNotification('');
    }, 300);
  };

  return (
    <section
      className={opened ?
        `${styles.card} ${styles.opened}`
      :
        `${styles.card}`
      }
    >
      <header className={styles.header}>
        <CloseButton
          handleFunction={closeNotification}
        />
      </header>

      <div className={styles.body}>

        <p className={styles.text}>
          {notification}
        </p>

      </div>
    </section>
  );
};

export default Notification;