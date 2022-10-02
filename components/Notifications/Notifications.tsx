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
  const [nbOfNotifications, setNbOfNotifications] = useState<number>(0);
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
        countNotifications(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const countNotifications = (notifications: Notification[]) => {
    let nb = 0;

    notifications.forEach(notification => {
      if(notification.seen === false) {
        nb++
      };
    });

    setNbOfNotifications(nb);
  };

  return (
    <>
      {notifications &&
        <>
          <button
            className={nbOfNotifications > 0 ?
              `${styles.button} ${styles.button_new}`
            :
              `${styles.button}`
            }
            title={nbOfNotifications > 0 ? 
              `${nbOfNotifications} ${nbOfNotifications > 1 ? "nouvelles notifications" : "nouvelle notification"}`
              : 
              "Pas de nouvelle notification"
            }
            aria-label="Ouvrir les notifications"
            type="button"
            onClick={() => setShowNotifications(true)}
          >
            {nbOfNotifications}
          </button>

          <section
            className={
              showNotifications ?
                `${styles.container} ${styles.opened}`
              :
                `${styles.container}`
            }
          >

            <header>
              <h1 className={styles.title}>
                Notifications
              </h1>

              <CloseButton
                handleFunction={() => setShowNotifications(false)}
              />
            </header>

            <ul className={styles.list}>

              {notifications.length === 0 &&
                <span className={styles.span}>
                  Vous n'avez aucune notification
                </span>
              }

              {notifications?.map((notification, index) =>

                <li key={uuidv4()}>
                  <NotificationCard
                    notification={notification}
                    userLogged={userLogged}
                    index={index}
                    notifications={notifications}
                    setCurrentNotification={setCurrentNotification}
                    setShowCurrentNotification={setShowCurrentNotification}
                    nbOfNotifications={nbOfNotifications}
                    setNbOfNotifications={setNbOfNotifications}
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