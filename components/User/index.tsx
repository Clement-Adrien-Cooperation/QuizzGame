import Image from 'next/image';
import { useState } from 'react';
import styles from './User.module.scss';
import defaultAvatar from '../../public/icons/defaultAvatar.svg';
import arrow from '../../public/icons/arrow.svg';
import UserDetails from '../UserDetails';

type UserProps = {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean,
  handleBanishement: Function,
  handlePromotion: Function
};

const User = ({
  id,
  pseudo,
  email,
  avatar,
  is_admin,
  is_banished,
  handleBanishement,
  handlePromotion
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
          id={pseudo}
          name='user'
        />

        <label
          className={styles.card}
          htmlFor={pseudo}
          onClick={toggleDetails}
        >

          <section className={styles.header}>

            <div className={styles.avatar}>
              {avatar === null ?
                <Image
                  src={defaultAvatar}
                  width='32'
                  height='32'
                  layout='responsive'
                />
              :
                <Image
                  src={avatar}
                  width='32'
                  height='32'
                  layout='responsive'
                />
              }
            </div>

            <h3 className={styles.pseudo}>
              {pseudo}
            </h3>

            <div className={styles.toggle_icon}>
              <Image
                src={arrow}
                width='32'
                height='32'
                layout='responsive'
              />
            </div>

          </section>

          { showDetails && (
            <UserDetails
              id={id}
              email={email}
              is_banished={is_banished}
              is_admin={is_admin}
              handleBanishement={handleBanishement}
              handlePromotion={handlePromotion}
            />
          )}
        </label>
      </div>
    </>
  );
};

export default User;