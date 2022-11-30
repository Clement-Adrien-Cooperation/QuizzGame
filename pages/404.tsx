import type { Dispatch, SetStateAction } from 'react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/NotFound.module.scss';

type Props = {
  setPageTitle: Dispatch<SetStateAction<string>>
};

const NotFound: NextPage<Props> = ({
  setPageTitle
}) => {

  useEffect(() => {
    setPageTitle("Erreur 404 - s'Quizz Game");
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Une erreur est survenue
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