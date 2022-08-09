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

type UserTypes = {
  id: number,
  pseudo: string,
  email?: string,
  avatar?: string,
  is_admin: boolean,
  is_banished: boolean,
  reported: boolean,
  reportMessage?: string[]
};

const emptyUser: UserTypes = {
  id: 0,
  pseudo: '',
  email: '',
  avatar: '',
  is_admin: false,
  is_banished: false,
  reported: false,
  reportMessage: []
};

const UserProfile: NextPage = () => {

  const router = useRouter();

  console.log(router.query.slug);
  

  const [showLoader, setShowLoader] = useState<boolean>(true);
  const [user, setUser] = useState<UserTypes>(emptyUser);
  const [userQuizz, setUserQuizz] = useState<QuizTypes[]>([]);

  useEffect(() => {

    getUser();
  }, []);

  const getUser = async () => {

    const pseudo = router.query.slug;

    await fetch('/api/user/getOneByPseudo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo })
    })
    .then(async(res) => {
      const data = await res.json();

      console.log(data);
      

      setUser(data);
      getQuizFromUser(data.id);
    })
    .catch((error) => {
      console.error(error);
      
      router.push('/');
    });
  };

  const getQuizFromUser = async (user_id: number) => {

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
      console.error(error);
    });
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Page de {user.pseudo}
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