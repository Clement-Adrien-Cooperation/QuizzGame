import { Notification, User } from '@prisma/client';
import type { FunctionComponent } from 'react'
import { useEffect, useState } from 'react'
import { api } from '../../api/api';
import CloseButton from '../CloseButton/CloseButton';
import { v4 as uuidv4 } from 'uuid';
import NotificationCard from './NotificationCard/NotificationCard';
import styles from './Notifications.module.scss';
import NotificationModal from './NotificationModal/NotificationModal';

type Props = {
  userLogged: User
};

const Notifications: FunctionComponent<Props> = ({
  userLogged
}) => {

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nbOfNotifications, setNbOfNotifications] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const [currentNotification, setCurrentNotification] = useState<Notification>(notifications[0]);
  const [showCurrentNotification, setShowCurrentNotification] = useState<boolean>(false);

  useEffect(() => {
    getUserNotifications();
  }, []);

  const getUserNotifications = async() => {
    // Get token from local storage
    const token = localStorage.getItem('token');

    await fetch(`${api}/notification/getAllFromUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id: userLogged.id })
    })
    .then(async(res) => {
      if(res.status === 200) {
        const data = await res.json();
        setNotifications(data);
        sortNotifications(data);
        console.log(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const sortNotifications = (notifications: Notification[]) => {
    notifications.forEach(notification => {
      if(!notification.seen) {
        const notifs = [...nbOfNotifications];
        const newNotifs = [...notifs, '+1'];
        setNbOfNotifications(newNotifs);
      };
    });
  };

  return (
    <>
      {notifications &&
        <>
          <button
            className={nbOfNotifications.length > 0 ?
              `${styles.button} ${styles.button_new}`
            :
              `${styles.button}`
            }
            title={nbOfNotifications.length > 0 ? 
              `${nbOfNotifications.length} nouvelle(s) notification(s)`
              : 
              "Pas de nouvelle notification"
            }
            aria-label="Ouvrir les notifications"
            type="button"
            onClick={() => setShowNotifications(true)}
          >
            {nbOfNotifications.length}
          </button>

          <section
            className={
              showNotifications ?
                `${styles.container} ${styles.opened}`
              :
                `${styles.container}`
            }
          >
            <CloseButton
              handleFunction={() => setShowNotifications(false)}
            />


            <ul className={styles.list}>

              {notifications?.map(notification =>
                <li
                  key={uuidv4()}
                  onClick={() => {
                    setShowCurrentNotification(false);
                    setCurrentNotification(notification);
                    setShowCurrentNotification(true);
                  }}
                >
                  <NotificationCard
                    notification={notification}
                    userLogged={userLogged}
                  />
                </li>
              )}
            </ul>
          </section>

          {showCurrentNotification &&
            <NotificationModal
              currentNotification={currentNotification}
              setShowCurrentNotification={setShowCurrentNotification}
            />
          }
        </>
      }
    </>
  );
};

export default Notifications;