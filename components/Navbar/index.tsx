import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
  return (
    <nav>
      <ul>

        <li>
          <Link href='/'>
            Accueil
          </Link>
        </li>

        <li>
          <Link href='/profil'>
            Profil
          </Link>
        </li>

        <li>
          <Link href='/connexion'>
            Se connecter
          </Link>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;