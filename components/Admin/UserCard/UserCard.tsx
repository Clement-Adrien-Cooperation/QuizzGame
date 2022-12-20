import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import styles from './UserCard.module.scss';
import UserDetails from '../UserDetails/UserDetails';
import AdminMessage from '../AdminMessage/AdminMessage';
import Message from '../../Message/Message';
import IconArrow from '../../../public/Icons/IconArrow';

type Props = {
  user: User,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void,
  handleDeleteUser: (user_id: string) => void
};

const UserCard: FunctionComponent<Props> = ({
  user,
  userLogged,
  handlePromotion,
  handleBanishment,
  handleDeleteUser
}) => {
  
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <article className={styles.container}>

        <input
          className={styles.input}
          type='checkbox'
          id={user.pseudo}
          name='user'
        />

        <label
          className={styles.card}
          htmlFor={user.pseudo}
          onClick={toggleDetails}
        >
          <section className={styles.header}>

            <h3 className={styles.pseudo}>
              {user.pseudo}
            </h3>

            <div className={styles.toggle_icon}>
              <IconArrow />
            </div>

          </section>

          {showDetails &&
            <UserDetails
              user={user}
              userLogged={userLogged}
              handleBanishment={handleBanishment}
              handlePromotion={handlePromotion}
              handleDeleteUser={handleDeleteUser}
              setShowMessageForm={setShowMessageForm}
            />
          }
        </label>
      </article>

      {showMessageForm &&
        <AdminMessage
          recipient={user.pseudo}
          userID={user.id}
          setNotification={setMessage}
          setShowMessageForm={setShowMessageForm}
        />
      }

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }
    </>
  );
};

export default UserCard;