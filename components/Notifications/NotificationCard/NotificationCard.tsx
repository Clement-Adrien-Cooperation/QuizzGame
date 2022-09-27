import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Notification, User } from '@prisma/client';
import { api } from '../../../api/api';
import styles from './NotificationCard.module.scss';

type Props = {
  notification: Notification,
  userLogged: User,
  index: number,
  notifications: Notification[],
  setCurrentNotification: Dispatch<SetStateAction<Notification>>,
  setShowCurrentNotification: Dispatch<SetStateAction<boolean>>,
  nbOfNotifications: number,
  setNbOfNotifications: Dispatch<SetStateAction<number>>
};

const NotificationCard: FunctionComponent<Props> = ({
  notification,
  userLogged,
  index,
  notifications,
  setCurrentNotification,
  setShowCurrentNotification,
  nbOfNotifications,
  setNbOfNotifications
}) => {

  const [seen, setSeen] = useState<boolean>(notification.seen);

  const handleNotificationSeen = () => {
    // Hide previous notification modal
    setShowCurrentNotification(false);

    // If this notification was not seen before,
    if(notifications[index].seen === false) {
      // Decrease the number of new notifications
      setNbOfNotifications(nbOfNotifications - 1);
    };

    // Update "seen" state of this notification for CSS
    notifications[index].seen = true;

    // set this notification in new modal
    setCurrentNotification(notification);
    setShowCurrentNotification(true);

    // then, update database
    updateNotification();
  };

  const updateNotification = async() => {
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
        onClick={handleNotificationSeen}
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