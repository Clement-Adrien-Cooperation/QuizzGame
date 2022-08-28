import Link from 'next/link';
import styles from './Navbar.module.scss';
import Theme from '../Theme/Theme';

type UserTypes = {
  id: string,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type NavBarProps = {
  isLogged: boolean,
  userLogged: UserTypes,
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUserLogged: React.Dispatch<React.SetStateAction<UserTypes>>
};

const Navbar = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged
}: NavBarProps) => {

  const handleDisconnect = () => {
      
    const unLoggedUser = {
      id: '',
      pseudo: '',
      email: '',
      password: '',
      avatar: '',
      is_admin: false,
      is_banished: false
    };

    localStorage.removeItem('token');

    setIsLogged(false);
    setUserLogged(unLoggedUser);
  };

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
                <a>
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
                <a>
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
                <a>
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
                <a>
                  Profil
                </a>
              </Link>
            </li>
          </>
        )}

        {!isLogged && !userLogged?.is_banished && (
          <li
            className={styles.list__item}
            title="Se connecter"
            aria-label="Se connecter"
          >
            <Link href='/connexion'>
              <a>
                Connexion
              </a>
            </Link>
          </li>
        )}

        {userLogged?.is_admin && !userLogged?.is_banished && (
          <li
            className={styles.list__item}
            title="Aller à la page d'administration"
            aria-label="Aller à la page d'administration"
          >
            <Link href='/admin/reports'>
              <a>
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
            <a>
              Contact
            </a>
          </Link>
        </li>

        {isLogged && !userLogged?.is_banished && (
          <li
            className={styles.list__item}
            title="Se déconnecter"
            aria-label="Se déconnecter"
          >
            <Link href='/'>
              <a onClick={handleDisconnect}>
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