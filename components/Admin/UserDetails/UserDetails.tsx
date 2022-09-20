import { User } from '@prisma/client';
import { FunctionComponent } from 'react';
import styles from './UserDetails.module.scss';

type Props = {
  id: string,
  email: string,
  is_admin: boolean,
  is_banished: boolean,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void
};

const UserDetails: FunctionComponent<Props> = ({
  id,
  email,
  is_banished,
  is_admin,
  userLogged,
  handlePromotion,
  handleBanishment
}) => {

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

      {userLogged.id === id ? (

        <div className={styles.footer}>
          <p className={styles.text}>
            Vous ne pouvez pas vous administrer vous-même
          </p>
        </div>

      ) : (
        <div className={styles.footer}>

          <button
            className={styles.button}
            type='button'
            title={is_banished ? 'Débannir cet utilisateur' : 'Bannir cet utilisateur'}
            aria-label={is_banished ? 'Débannir cet utilisateur' : 'Bannir cet utilisateur'}
            onClick={() => handleBanishment(id, is_banished)}
          >
            {is_banished ? "Débannir" : "Bannir"}
          </button>

          {!is_banished && (
            
            <button
              className={styles.button__secondary}
              type='button'
              title={is_admin ? 'Rétrograder cet utilisateur' : 'Promouvoir cet utilisateur'}
              aria-label={is_admin ? 'Rétrograder cet utilisateur' : 'Promouvoir cet utilisateur'}
              onClick={() => handlePromotion(id, is_admin)}
            >
              {is_admin ? "Rétrograder" : "Promouvoir"}
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default UserDetails;