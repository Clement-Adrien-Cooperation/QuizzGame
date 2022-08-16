import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminQuizz from '../../components/AdminQuizz/AdminQuizz';
import AdminDeletedQuizz from '../../components/AdminDeletedQuizz/AdminDeletedQuizz';
import styles from '../../styles/admin/AdminQuizz.module.scss';

const Quizz: NextPage = ({
  userLogged,
  quizzData,
  deletedQuizzData
}: any) => {

  const router = useRouter();

  useEffect(() => {
    
    // If user is not admin, we redirect him to home page
    if(userLogged?.is_admin === false) {
      router.push('/');
    } else {
      document.title = "Modérer les Quizz - s'Quizz Game";
    };

  }, []);

  return (
    <>
      <AdminHeader />

      <aside className={styles.buttons}>

        <a
          className={styles.buttons__item}
          href='#quizz'
        >
          Aller aux quizz
        </a>

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
          />
        </section>

        {deletedQuizzData.length === 0 ? '' : (

          <section
            className={styles.quizz}
            id='deleted-quizz'
          >
            <AdminDeletedQuizz
              deletedQuizzData={deletedQuizzData}
            />
          </section>
        )} 
      </div>
    </>
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