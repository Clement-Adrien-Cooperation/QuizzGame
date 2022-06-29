import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>

        <li>
          <Link href='/'>
            <a>
              Accueil
            </a>
          </Link>
        </li>

        <li>
          <Link href='/profil'>
            <a>
              Profil
            </a>
          </Link>
        </li>

        <li>
          <Link href='/connexion'>
            <a>
              Se connecter
            </a>
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;