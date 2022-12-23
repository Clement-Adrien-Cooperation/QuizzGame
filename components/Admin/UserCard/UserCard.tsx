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
  index: number,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean, index: number) => void,
  handleBanishment: (user_id: string, is_banished: boolean, index: number) => void,
  handleDeleteUser: (user_id: string, index: number) => void
};

const UserCard: FunctionComponent<Props> = ({
  user,
  index,
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
          style={{background: user.is_admin ? 'var(--main-color-light)' : 'var(--body-color)'}}
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
              index={index}
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