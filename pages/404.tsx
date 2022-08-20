import { NextPage } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/NotFound.module.scss';
import home from '../public/icons/home.svg';

const NotFound: NextPage = () => {

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          La page que vous cherchez n'existe pas
        </h1>
      </header>

      <Link href='/'>
        <a
          className={styles.link}
          type='button'
          title="Revenir à la page d'accueil"
          aria-label="Revenir à la page d'accueil"
        >
          Accueil
        </a>
      </Link>
    </section>
  );
};

export default NotFound;