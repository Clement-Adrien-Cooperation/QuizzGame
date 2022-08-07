import { useEffect, useState } from 'react';
import styles from './UserDetails.module.scss';

type UserLoggedTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean
};

type UserDetailsProps = {
  id: number,
  email: string,
  is_banished: boolean,
  is_admin: boolean,
  handleBanishement: Function,
  handlePromotion: Function,
  userLogged: UserLoggedTypes
};

const UserDetails = ({
  id,
  email,
  is_banished,
  is_admin,
  handleBanishement,
  handlePromotion,
  userLogged
} :UserDetailsProps) => {

  const [showButtons, setShowButtons] = useState<boolean>(true);

  useEffect(() => {
    if(userLogged.id === id) {
      setShowButtons(false);
    };
  }, []);

  return (
    <section className={styles.details}>

      <div className={styles.body}>

        <p className={styles.content}>
          <span className={styles.subtitle}>ID :</span> {id}
        </p>

        <p className={styles.content}>
          <span className={styles.subtitle}>Mail :</span> {email}
        </p>

        <p className={styles.content}>
          <span className={styles.subtitle}>Administrateur :</span> {is_admin ? 'Oui' : 'Non'}
        </p>

      </div>

      {showButtons ? (

        <div className={styles.footer}>

          <button
            className={styles.button}
            onClick={() => handleBanishement(id, is_banished)}
          >
            {is_banished ? "Débannir" : "Bannir"}
          </button>

          {!is_banished && (
            
            <button
              className={styles.button__secondary}
              onClick={() => handlePromotion(id, is_admin)}
            >
              {is_admin ? "Rétrograder" : "Promouvoir"}
            </button>
          )}
        </div>
      ) : (
        <div className={styles.footer}>
          <p className={styles.text}>
            Vous ne pouvez pas vous administrer vous-même
          </p>
        </div>
      )}
    </section>
  );
};

export default UserDetails;