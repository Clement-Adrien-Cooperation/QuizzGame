import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminQuizz from '../../components/AdminQuizz/AdminQuizz';
import AdminDeletedQuizz from '../../components/AdminDeletedQuizz/AdminDeletedQuizz';
import styles from '../../styles/admin/AdminQuizz.module.scss';
import Loader from '../../components/Loader/Loader';

const Quizz: NextPage = ({
  isLogged,
  userLogged,
  quizzData,
  deletedQuizzData
}: any) => {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    // If user is not admin, we redirect him to home page
    if(isLogged) {
      if(userLogged?.is_admin === true) {
        document.title = "Modérer les Quizz - s'Quizz Game";
        setShowLoader(false);
      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const handleModerateQuiz = async(id: number, is_visible: boolean) => {

    setShowLoader(true);

    await fetch(`/api/user/moderate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_visible })
    })
    .then(async(res) => {
      const data = await res.json();
      console.log(data);
      // refaire appel api pour mettre à jour les states ?
      // resetQuizz()
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleDeleteQuiz = async(id: number) => {

    setShowLoader(true);

    await fetch(`/api/user/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then((res) => {
      // refaire appel api pour mettre à jour les states ?
      // resetQuizz()
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

        {deletedQuizzData.length === 0 ? '' : (
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
            quizzData={quizzData}
            handleModerateQuiz={handleModerateQuiz}
            handleDeleteQuiz={handleDeleteQuiz}
          />
        </section>

        {deletedQuizzData.length === 0 ? '' : (

          <section
            className={styles.quizz}
            id='deleted-quizz'
          >
            <AdminDeletedQuizz
              deletedQuizzData={deletedQuizzData}
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
  const quizzDataFromAPI = await fetch('http://localhost:3000/api/quizz/getAll');
  const deletedQuizzDataFromAPI = await fetch('http://localhost:3000/api/quizz/getDeletedQuizz');

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