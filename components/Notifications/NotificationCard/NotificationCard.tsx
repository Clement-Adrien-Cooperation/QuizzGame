import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { Notification, User } from '@prisma/client';
import { api } from '../../../api/api';
import styles from './NotificationCard.module.scss';

type Props = {
  notification: Notification,
  userLogged: User
};

const NotificationCard: FunctionComponent<Props> = ({
  notification,
  userLogged
}) => {

  const [seen, setSeen] = useState<boolean>(notification.seen);

  const notificationSeen = async() => {
    setSeen(true);

    const token = localStorage.getItem('token');

    // We need user_id for comparing with ID in the token
    // and ID of the notification
    const body = {
      id: notification.id,
      user_id: userLogged.id
    };

    await fetch(`${api}/notification/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <article
        className={seen ?
          `${styles.card} ${styles.seen}`
        :
          `${styles.card}`
        }
        onClick={notificationSeen}
      >
        <p className={styles.title}>
          {notification.title}
        </p>

        <span className={styles.date}>
          {notification.date}
        </span>
      </article>
    </>
  );
};

export default NotificationCard;