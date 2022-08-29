import Image from 'next/image';
import { useState } from 'react';
import styles from './User.module.scss';
import defaultAvatar from '../../public/icons/defaultAvatar.svg';
import arrow from '../../public/icons/arrow.svg';
import UserDetails from '../UserDetails/UserDetails';

type UserLoggedTypes = {
  id: string,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean
};

type UserTypes = {
  id: string,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type UserProps = {
  user: UserTypes,
  handleBanishement: Function,
  handlePromotion: Function;
  userLogged: UserLoggedTypes
};

const User = ({
  user,
  handleBanishement,
  handlePromotion,
  userLogged
} : UserProps ) => {
  
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <>
      <div className={styles.container}>

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

            <div className={styles.avatar}>
              <Image
                src={user.avatar === null ? defaultAvatar : user.avatar}
                width='32'
                height='32'
                layout='responsive'
                alt="Avatar de l'utilisateur"
              />
            </div>

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
              email={user.email}
              is_banished={user.is_banished}
              is_admin={user.is_admin}
              handleBanishement={handleBanishement}
              handlePromotion={handlePromotion}
              userLogged={userLogged}
            />
          )}
        </label>
      </div>
    </>
  );
};

export default User;