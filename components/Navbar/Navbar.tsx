import Link from 'next/link';
import styles from './Navbar.module.scss';
import Theme from '../Theme/Theme';

type UserTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean,
};

type NavBarProps = {
  isLogged: boolean,
  userLogged: UserTypes,
  setIsLogged: Function,
  setUserLogged: Function
};

const Navbar = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged
}: NavBarProps) => {

  const handleDisconnect = () => {
      
    const unLoggedUser = {
      id: 0,
      pseudo: '',
      is_admin: false,
      is_banished: false
    };

    setIsLogged(false);
    setUserLogged(unLoggedUser);
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>

        {!userLogged?.is_banished && (
          <>
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
          </>
        )}

        {isLogged && !userLogged?.is_banished && (
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

        {!isLogged && !userLogged?.is_banished && (
          <li className={styles.list__item}>
            <Link href='/connexion'>
              <a>
                Se connecter
              </a>
            </Link>
          </li>
        )}

        {userLogged?.is_admin && !userLogged?.is_banished && (
          <li className={styles.list__item}>
            <Link href='/admin'>
              <a>
                Administration
              </a>
            </Link>
          </li>
        )}
        
        <li className={styles.list__item}>
          <Link href='/contact'>
            <a>
              Contact
            </a>
          </Link>
        </li>

        {isLogged && !userLogged?.is_banished && (
          <li className={styles.list__item}>
            <Link href='/'>
              <a onClick={handleDisconnect}>
                Se déconnecter
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