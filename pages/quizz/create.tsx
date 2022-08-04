import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import QuizEdit from '../../components/QuizEdit/QuizEdit';

const CreateQuizz: NextPage = ({ isLogged, userLogged }:any) => {

  const router = useRouter();

  useEffect(() => {

    if(!isLogged) {
      router.push('/');
    } else {
      document.title = `Créer mon quiz - s'Quizz Game`;
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

export default CreateQuizz;