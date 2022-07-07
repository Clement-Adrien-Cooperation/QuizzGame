import Image from 'next/image';
import { useState, useRef } from 'react';
import styles from './User.module.scss';

import defaultAvatar from '../../public/icons/defaultAvatar.svg';
import arrow from '../../public/icons/arrow.svg';

const User = ({
  id,
  pseudo,
  email,
  avatar,
  is_admin,
  is_banished,
  unBanUser,
  banUser,
  deleteUser
}: {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean,
  banUser: Function
  unBanUser: Function,
  deleteUser: Function
}) => {

  const iconRef = useRef<HTMLDivElement>(null);
  
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    iconRef.current?.classList.toggle('rotate');
  };

  return (
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

          <div
            className={styles.toggle_icon}
            ref={iconRef}
          >
            <Image
              src={arrow}
              width='32'
              height='32'
              layout='responsive'
            />
          </div>

        </section>

        { showDetails && (
          <section className={styles.wrapper}>

            <div className={styles.body}>

              <p className={styles.content}>
                <span className={styles.subtitle}>ID :</span> {id}
              </p>

              <p className={styles.content}>
                <span className={styles.subtitle}>Mail :</span> {email}
              </p>

            </div>

            <section className={styles.footer}>

              <button
                className={styles.button}
                onClick={() => is_banished ? unBanUser(id) : banUser(id)}
              >
                {is_banished ? "Débannir" : "Bannir"}
              </button>

              {is_banished && (
                
                <button
                  className={styles.button__secondary}
                  onClick={() => is_banished ? deleteUser(id) : deleteUser(id)}
                >
                  Supprimer définitivement
                </button>
              )}

            </section>
          </section>
        )}
      </label>
    </div>
  );
};

export default User;