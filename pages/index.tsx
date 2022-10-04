import type { NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../api/api';
import styles from '../styles/Home.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

export const getRandomNumber = (min: number, max: number) => {
  // Classic random number generator
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Home: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader
}) => {

  const router = useRouter();
  
  useEffect(() => {

    // document.title = "s'Quizz Game";

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    };
  }, []);

  const getUsers = async () => {
    setShowLoader(true);

    const token = localStorage.getItem('token');

    await fetch(`${api}/user/getAll`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      if(res.status === 200) {
        const data = await res.json();
        console.log(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <strong>s'Quizz Game</strong>
        </h1>

        {isLogged && (
          <p className={styles.text}>
            Salut {userLogged?.pseudo}, découvre et joue aux quizz créés par la communauté de s'Quizz Game !
          </p>
        )}
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
    </>
  );
};

export default Home;