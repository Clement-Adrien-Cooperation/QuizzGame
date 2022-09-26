import type { GetServerSideProps, NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { Category, Question, Quiz, User } from '@prisma/client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import EditQuiz from '../../components/EditQuiz/EditQuiz';

const emptyQuiz: Quiz = {
  id: '',
  user_id: '',
  creator: '',
  title: '',
  category: '',
  difficulty: '',
  is_visible: false,
  date: '',
  nbOfQuestions: 0,
  rate: []
};

const emptyQuestion: Question = {
  id: '',
  user_id: '',
  quiz_id: '',
  question: '',
  description: '',
  proposals: [],
  answer: ''
};

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  categoriesData: Category[]
};

const CreateQuizz: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader,
  categoriesData
}) => {

  const router = useRouter();
  
  useEffect(() => {

    document.title = `Créer mon quiz - s'Quizz Game`;

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    } else {
      router.push('/');
    };
  }, []);

  return (
    <>
      <EditQuiz
        userLogged={userLogged}
        setShowLoader={setShowLoader}
        quizData={emptyQuiz}
        questionsData={[emptyQuestion]}
        categoriesData={categoriesData}
      />
    </>
  );
};

export default CreateQuizz;

export const getServerSideProps: GetServerSideProps = async () => {

  const categoriesDataFromAPI = await fetch(`${api}/category/getAll`);
  const categoriesData = await categoriesDataFromAPI.json();
  
  return {
    props: {
      categoriesData
    }
  };
};