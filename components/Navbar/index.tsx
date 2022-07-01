import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
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
          <Link href='/profil'>
            <a>
              Profil
            </a>
          </Link>
        </li>

        <li className={styles.list__item}>
          <Link href='/connexion'>
            <a>
              Se connecter
            </a>
          </Link>
        </li>

        <li className={styles.list__item}>
          <Link href='/admin'>
            <a>
              Administration
            </a>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;