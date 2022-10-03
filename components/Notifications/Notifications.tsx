import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { Notification, User } from '@prisma/client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CloseButton from '../CloseButton/CloseButton';
import NotificationCard from './NotificationCard/NotificationCard';
import styles from './Notifications.module.scss';
import NotificationModal from './NotificationModal/NotificationModal';

type Props = {
  userLogged: User,
  notifications: Notification[],
  nbOfNotifications: number,
  setNbOfNotifications: Dispatch<SetStateAction<number>>
};

const Notifications: FunctionComponent<Props> = ({
  userLogged,
  notifications,
  nbOfNotifications,
  setNbOfNotifications
}) => {

  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  const [currentNotification, setCurrentNotification] = useState<Notification>(notifications[0]);
  const [showCurrentNotification, setShowCurrentNotification] = useState<boolean>(false);

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