import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import styles from './UserDetails.module.scss';

type Props = {
  id: string,
  pseudo: string,
  email: string,
  is_admin: boolean,
  is_banished: boolean,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void
};

const UserDetails: FunctionComponent<Props> = ({
  id,
  pseudo,
  email,
  is_banished,
  is_admin,
  userLogged,
  handlePromotion,
  handleBanishment
}) => {

  const router = useRouter();

  return (
    <section className={styles.details}>

      {userLogged.id === id ?

        <div className={styles.footer}>
          <p className={styles.text}>
            Vous ne pouvez pas vous administrer vous-même
          </p>
        </div>

      :
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

          <button
            className={styles.button}
            type='button'
            title={is_banished ? 'Débannir cet utilisateur' : 'Bannir cet utilisateur'}
            aria-label={is_banished ? 'Débannir cet utilisateur' : 'Bannir cet utilisateur'}
            onClick={() => router.push(`/profile/${pseudo}`)}
          >
            Profil
          </button>
        </div>
      }
    </section>
  );
};

export default UserDetails;