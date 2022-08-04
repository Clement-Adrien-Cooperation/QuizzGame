import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import QuizEdit from '../../../components/QuizEdit/QuizEdit';

const UpdateQuiz: NextPage = ({ isLogged, userLogged }:any) => {
  
  const router = useRouter();

  useEffect(() => {

    if(!isLogged) {
      router.push('/');
    } else {
      document.title = `Modifier mon quiz - s'Quizz Game`;
    };
  }, []);

  return (
    <>
      <QuizEdit
        userLogged={userLogged}
      />
    </>
  );
};

export default UpdateQuiz;