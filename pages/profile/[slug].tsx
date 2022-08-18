import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import UserProfileQuizCard from '../../components/UserProfileQuizCard/UserProfileQuizCard';
import styles from '../../styles/UserProfile.module.scss';

type QuizTypes = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: boolean,
  date: string,
  rate: number,
  reported: boolean,
  reportMessage?: string[]
};

const UserProfile: NextPage = ({ isLogged, userLogged }: any) => {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [userQuizz, setUserQuizz] = useState<QuizTypes[]>([]);

  useEffect(() => {
    if(isLogged) {
      if(userLogged.is_banished === true) {
        router.push('/banned');
      };
    };

    getQuizzFromUser(userLogged.id);
  }, []);

  const getQuizzFromUser = async (user_id: number) => {

    await fetch('/api/quizz/getUserQuizz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id })
    })
    .then(async(res) => {
      const data = await res.json();
      setUserQuizz(data);
    })
    .then(() => {
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Page de {userLogged.pseudo}
        </h1>
      </header>

      <section className={styles.container}>

        <ul className={styles.list}>

          {userQuizz.map((quiz: QuizTypes, index: number) =>
            <li key={index}>
              <UserProfileQuizCard
                title={quiz.title}
                category={quiz.category}
                difficulty={quiz.difficulty}
                lang={quiz.lang}
                image={quiz.image}
                date={quiz.date}
                rate={quiz.rate}
              />
            </li>
          )}

        </ul>
      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default UserProfile;