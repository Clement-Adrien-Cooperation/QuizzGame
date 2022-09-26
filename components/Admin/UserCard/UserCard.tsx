import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './UserCard.module.scss';
import arrow from '../../../public/icons/arrow.svg';
import UserDetails from '../UserDetails/UserDetails';

type Props = {
  user: User,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void
};

const UserCard: FunctionComponent<Props> = ({
  user,
  userLogged,
  handlePromotion,
  handleBanishment
}) => {
  
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
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
            <Image
              src={arrow}
              width='32'
              height='32'
              layout='responsive'
              alt="Ouvrir les détails de l'utilisateur"
            />
          </div>

        </section>

        { showDetails && (
          <UserDetails
            id={user.id}
            pseudo={user.pseudo}
            email={user.email}
            is_banished={user.is_banished}
            is_admin={user.is_admin}
            handleBanishment={handleBanishment}
            handlePromotion={handlePromotion}
            userLogged={userLogged}
          />
        )}
      </label>
    </article>
  );
};

export default UserCard;