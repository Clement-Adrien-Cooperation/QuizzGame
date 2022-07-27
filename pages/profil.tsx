import type { NextPage } from 'next';
import { useEffect } from 'react';
import styles from '../styles/Profil.module.scss';

const Profil: NextPage = () => {

  useEffect(() => {

    document.title = "Modifier mon profil - s'Quizz Game";

  }, []);
  return (
    <>
      <h1 className={styles.title}>
        Ma page de profil
      </h1>
    </>
  );
};

export default Profil;