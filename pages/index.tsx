import { User } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import styles from '../styles/Home.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  handleDisconnect: () => void
};

const Home: NextPage<Props> = ({
  isLogged,
  userLogged,
  handleDisconnect
}) => {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(false);
  
  useEffect(() => {

    document.title = "s'Quizz Game";

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    };
  }, []);

  const getUsers = async () => {

    const token = localStorage.getItem('token');

    setShowLoader(true);

    await fetch('/api/user/getAll', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      

      if(res.status === 401) {
        handleDisconnect();
      } else if(res.status === 200) {
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
          s'Quizz Game
        </h1>

        {isLogged && (
          <p className={styles.text}>
            Salut {userLogged?.pseudo}, découvre et joue aux quizz créés par les utilisateurs !
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

      { showLoader && (
        <Loader />
      )}
    </>
  );
};

export default Home;