import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  const getUsers = async () => {
    await fetch('/api/getAllUsers')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
  };
  
  return (
    <>

      <h1 className={styles.title}>
        s'Quizz Game
      </h1>

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

    </>
  );
};

export default Home;