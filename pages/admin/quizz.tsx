import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminQuizz from '../../components/AdminQuizz/AdminQuizz';
import AdminDeletedQuizz from '../../components/AdminDeletedQuizz/AdminDeletedQuizz';
import styles from '../../styles/admin/AdminQuizz.module.scss';
import Loader from '../../components/Loader/Loader';

type QuizTypes = {
  id: string,
  user_id: string,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: boolean,
  date: string,
  rate: number,
  reported: boolean
};

const Quizz: NextPage = ({
  isLogged,
  userLogged,
  quizzData,
  deletedQuizzData
}: any) => {

  const router = useRouter();

  const [quizz, setQuizz] = useState<QuizTypes[]>([]);
  const [deletedQuizz, setDeletedQuizz] = useState<QuizTypes[]>([]);

  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    // If user is not admin, we redirect him to home page
    if(isLogged) {
      if(userLogged?.is_admin === true) {
        document.title = "Modérer les Quizz - s'Quizz Game";

        setQuizz(quizzData);
        setDeletedQuizz(deletedQuizzData);

        setShowLoader(false);
      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getQuizz = async () => {

    await fetch('/api/quiz/getAll')
    .then(async(res) => {
      const data = await res.json();
      setQuizz(data);
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });

    await fetch('/api/quiz/getDeletedQuizz')
    .then(async(res) => {
      const data = await res.json();
      setDeletedQuizz(data);
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleModerateQuiz = async(id: string, is_visible: boolean) => {

    setShowLoader(true);

    await fetch('/api/quiz/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_visible })
    })
    .then(() => {
      getQuizz();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleDeleteQuiz = async(id: string) => {

    setShowLoader(true);

    await fetch('/api/quiz/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(() => {
      getQuizz();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <section className={styles.wrapper}>
      <AdminHeader />

      <aside className={styles.buttons}>
        {quizzData.length < 10 ? '' : (
          <a
            className={styles.buttons__item}
            href='#quizz'
          >
            Aller aux quizz
          </a>
        )}

        {deletedQuizzData.length === 0 
        || quizz.length < 10 ? '' : (
          <a
            className={styles.buttons__item}
            href='#deleted-quizz'
          >
            Aller aux quizz supprimés
          </a>
        )}
      </aside>

      <div className={styles.container}>
        <section
          className={styles.quizz}
          id='quizz'
        >
          <AdminQuizz
            quizz={quizz}
            handleModerateQuiz={handleModerateQuiz}
            handleDeleteQuiz={handleDeleteQuiz}
          />
        </section>

        {deletedQuizz.length === 0 ? '' : (

          <section
            className={styles.quizz}
            id='deleted-quizz'
          >
            <AdminDeletedQuizz
              deletedQuizz={deletedQuizz}
              handleModerateQuiz={handleModerateQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
            />
          </section>
        )} 
      </div>

      {showLoader && (
        <Loader />
      )}
    </section>
  );
};

export default Quizz;

export async function getStaticProps() {

  // Get data from API for users & bannished users
  const quizzDataFromAPI = await fetch('http://localhost:3000/api/quiz/getAll');
  const deletedQuizzDataFromAPI = await fetch('http://localhost:3000/api/quiz/getDeletedQuizz');

  // Translate to JSON
  const quizzData = await quizzDataFromAPI.json();
  const deletedQuizzData = await deletedQuizzDataFromAPI.json();

  // We return those props & using it in the states
  return {
    props: {
      quizzData,
      deletedQuizzData
    }
  };
};