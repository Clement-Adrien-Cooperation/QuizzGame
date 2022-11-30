import type { GetServerSideProps, NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { Category, Question, Quiz, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '../../../api/api';
import EditQuiz from '../../../components/EditQuiz/EditQuiz';
import styles from '../../../styles/UpdateQuizz.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>,
  quizData: Quiz,
  questionsData: Question[],
  categoriesData: Category[]
};

const UpdateQuiz: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader,
  setPageTitle,
  quizData,
  questionsData,
  categoriesData
}) => {

  const router = useRouter();

  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.id !== quizData.user_id) {
        router.push('/404');
      } else {
        setPageTitle(`Modifier "${router.query.slug}" - s'Quizz Game`);
      };
    } else {
      router.push('/');
    };
  }, []);

  return (
    <>
      <div className={styles.container}>

        <EditQuiz
          userLogged={userLogged}
          setShowLoader={setShowLoader}
          quizData={quizData}
          questionsData={questionsData}
          categoriesData={categoriesData}
        />

      </div>
    </>
  );
};

export default UpdateQuiz;

export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const title = context.query.slug;

  const categoriesDataFromAPI = await fetch(`${api}/category/getAll`);
  const categoriesData = await categoriesDataFromAPI.json();

  // Get data from API
  const quizDataFromAPI = await fetch(`${api}/quiz/getOne`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  // Translate to JSON
  const quizData = await quizDataFromAPI.json();

  if(!quizData) {
    return {
      notFound: true
    };
  } else {

    if(quizData.nbOfQuestions > 0) {

      const quiz_id = quizData.id;

      const questionsDataFromAPI = await fetch(`${api}/question/getAllFromQuiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quiz_id })
      });

      const questionsData = await questionsDataFromAPI.json();

      return {
        props: {
          quizData,
          questionsData,
          categoriesData
        }
      };

    } else {
      return {
        props: {
          quizData,
          questionsData: [],
          categoriesData
        }
      }
    };
  };
};