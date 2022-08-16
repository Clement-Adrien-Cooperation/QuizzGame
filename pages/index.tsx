import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {

    document.title = "s'Quizz Game";

  }, []);

  const getUsers = async () => {

    setShowLoader(true);

    await fetch('/api/user/getAll')
    .then((res) => {
      return res.json();
    })
    .then(async(res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };
  
  return (
    <>
      <header>
        <h1 className={styles.title}>
          s'Quizz Game
        </h1>
      </header>

      <section className={styles.container}>

        <button
          className={styles.button1}
          type='button'
          onClick={getUsers}
        >
          Get users
        </button>

        <button
          className={styles.button2}
          type='button'
          onClick={getUsers}
        >
          Get users
        </button>

        <button
          className={styles.button3}
          type='button'
          onClick={getUsers}
        >
          Get users
        </button>

      </section>

      { showLoader && (
        <Loader />
      )}
    </>
  );
};

export default Home;