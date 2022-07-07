import type { NextPage } from 'next';
import SignUp from '../components/SignUp';
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

      <SignUp />

      <section className={styles.container}>

        <button
          className={styles.button}
          type='button'
          onClick={getUsers}
        >
          GET USERS
        </button>

      </section>

    </>
  );
};

export default Home;