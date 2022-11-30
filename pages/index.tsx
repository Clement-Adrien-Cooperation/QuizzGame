import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import type { Quiz, User } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../api/api';
import styles from '../styles/Home.module.scss';
import QuizzSlider from '../components/QuizzSlider/QuizzSlider';

type Props = {
  isLogged: boolean,
  userLogged: User,
  bestRatedQuizz: Quiz[],
  mostPlayedQuizz: Quiz[],
  mostRecentsQuizz: Quiz[],
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Home: NextPage<Props> = ({
  isLogged,
  userLogged,
  bestRatedQuizz,
  mostPlayedQuizz,
  mostRecentsQuizz,
  setPageTitle
}) => {

  const router = useRouter();

  useEffect(() => {

    setPageTitle("s'Quizz Game - créez et jouez aux quizz de la communauté")

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    };
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <strong>s'Quizz Game</strong>
        </h1>

        {isLogged &&
          <p className={styles.text}>
            Salut {userLogged?.pseudo}, découvre et joue aux quizz créés par la communauté de s'Quizz Game !
          </p>
        }
      </header>

      <main className={styles.container}>

        <div className={`${styles.filter} ${styles.filter_left}`} />

        <QuizzSlider
          quizz={mostPlayedQuizz}
          title={"Quizz les plus joués"}
        />

        <QuizzSlider
          quizz={bestRatedQuizz}
          title={"Quizz les mieux notés"}
        />

        <QuizzSlider
          quizz={mostRecentsQuizz}
          title={"Quizz les plus récents"}
        />

        <div className={`${styles.filter} ${styles.filter_right}`} />

      </main>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async() => {

  const bestRatedQuizzData = await fetch(`${api}/quiz/getQuizzByRate`);
  const mostPlayedQuizzData = await fetch(`${api}/quiz/getQuizzByPlayed`);
  const mostRecentsQuizzData = await fetch(`${api}/quiz/getQuizzByDate`);

  const bestRatedQuizz = await bestRatedQuizzData.json();
  const mostPlayedQuizz = await mostPlayedQuizzData.json();
  const mostRecentsQuizz = await mostRecentsQuizzData.json();

  return {
    props: {
      bestRatedQuizz,
      mostPlayedQuizz,
      mostRecentsQuizz
    }
  };
};