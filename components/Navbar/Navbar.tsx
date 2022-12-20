import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import Link from 'next/link';
import styles from './Navbar.module.scss';
import Theme from '../Theme/Theme';

type Props = {
  isLogged: boolean,
  userLogged: User,
  handleDisconnect: () => void
};

const Navbar: FunctionComponent<Props> = ({
  isLogged,
  userLogged,
  handleDisconnect
}) => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>

        {!userLogged?.is_banished && (
          <>
            <li
              className={styles.list__item}
              title="Revenir à la page d'accueil"
              aria-label="Revenir à la page d'accueil"
            >
              <Link href='/'>
                <a className={styles.list__item__link}>
                  Accueil
                </a>
              </Link>
            </li>

            <li
              className={styles.list__item}
              title="Voir tous les quizz"
              aria-label="Voir tous les quizz"
            >
              <Link href='/quizz'>
                <a className={styles.list__item__link}>
                  Quizz
                </a>
              </Link>
            </li>
          </>
        )}

        {isLogged && !userLogged?.is_banished && (
          <>
            <li
              className={styles.list__item}
              title="Créer un nouveau quiz"
              aria-label="Créer un nouveau quiz"
            >
              <Link href='/quizz/create'>
                <a className={styles.list__item__link}>
                  Créer un quiz
                </a>
              </Link>
            </li>

              <li
                className={styles.list__item}
                title="Aller à ma page de profil"
                aria-label="Aller à ma page de profil"
              >
              <Link href='/profile'>
                <a className={styles.list__item__link}>
                  Mon espace
                </a>
              </Link>
            </li>
          </>
        )}

        {!isLogged && (
          <li
            className={styles.list__item}
            title="Se connecter"
            aria-label="Se connecter"
          >
            <Link href='/connexion'>
              <a className={styles.list__item__link}>
                Connexion
              </a>
            </Link>
          </li>
        )}

        {isLogged && userLogged?.is_admin && !userLogged?.is_banished && (
          <li
            className={styles.list__item}
            title="Aller à la page d'administration"
            aria-label="Aller à la page d'administration"
          >
            <Link href='/admin/reports'>
              <a className={styles.list__item__link}>
                Administration
              </a>
            </Link>
          </li>
        )}

        <li
          className={styles.list__item}
          title="Contactez nous"
          aria-label="Contactez nous"
        >
          <Link href='/contact'>
            <a className={styles.list__item__link}>
              Contact
            </a>
          </Link>
        </li>

        {isLogged && !userLogged?.is_banished && (
          <li
            className={styles.list__item}
            title="Se déconnecter"
            aria-label="Se déconnecter"
            onClick={handleDisconnect}
          >
            <Link href='/'>
              <a className={styles.list__item__link}>
                Déconnexion
              </a>
            </Link>
          </li>
        )}
      </ul>

      <Theme />
    </nav>
  );
};

export default Navbar;