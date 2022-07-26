import Link from 'next/link';
import styles from './Navbar.module.scss';

import Theme from '../Theme/Theme';

const Navbar = ({ isLogged }: {isLogged:boolean}) => {

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>

        <li className={styles.list__item}>
          <Link href='/'>
            <a>
              Accueil
            </a>
          </Link>
        </li>

        <li className={styles.list__item}>
          <Link href='/quizz'>
            <a>
              Quizz
            </a>
          </Link>
        </li>

        {isLogged && (
          <>
            <li className={styles.list__item}>
              <Link href='/quizz/create'>
                <a>
                  Créer un quizz
                </a>
              </Link>
            </li>

            <li className={styles.list__item}>
              <Link href='/profil'>
                <a>
                  Profil
                </a>
              </Link>
            </li>
          </>
        )}

        {!isLogged && (
          <li className={styles.list__item}>
            <Link href='/connexion'>
              <a>
                Se connecter
              </a>
            </Link>
          </li>
        )}

        {isLogged && (
          <li className={styles.list__item}>
            <Link href='/admin'>
              <a>
                Administration
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