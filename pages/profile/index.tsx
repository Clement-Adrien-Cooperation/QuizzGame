import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EditProfile from '../../components/EditProfile/EditProfile';
import Loader from '../../components/Loader/Loader';
import UserQuizCard from '../../components/UserQuizCard/UserQuizCard';
import styles from '../../styles/Profile.module.scss';

type QuizTypes = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  lang: string,
  difficulty: string,
  is_visible: boolean,
  date: string,
  reported?: boolean,
  reportMessage?: string
};

const Profile: NextPage = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged
}: any) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<QuizTypes[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {

    if(!isLogged) {
      router.push('/');
    } else {
      document.title = "Mon profil - s'Quizz Game";
      getQuizzFromUser();
    };
  }, []);

  const getQuizzFromUser = async() => {
    
    const user_id = userLogged.id;

    await fetch('api/quizz/getUserQuizz', {
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
      <header>
        <h1 className={styles.title}>
          Ma page de profil
        </h1>

      </header>

      <section className={styles.container}>
        <h2 className={styles.container__title}>
          Modifier mon profil
        </h2>

        <EditProfile
          isLogged={isLogged}
          userLogged={userLogged}
          setIsLogged={setIsLogged}
          setUserLogged={setUserLogged}
        />

      </section>

      <section className={styles.container}>
        <h2 className={styles.container__title}>
          Mes Quizz
        </h2>

        <ul className={styles.list}>

          {userQuizz?.map(quiz =>

            <li key={quiz.id}>
              <UserQuizCard
                id={quiz.id}
                title={quiz.title}
                category={quiz.category}
                lang={quiz.lang}
                difficulty={quiz.difficulty}
                is_visible={quiz.is_visible}
                date={quiz.date}
                reported={quiz.reported}
                reportMessage={quiz.reportMessage}
                getQuizzFromUser={getQuizzFromUser}
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

export default Profile;