import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import EditQuiz from '../../components/EditQuiz/EditQuiz';

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
      <EditQuiz
        userLogged={userLogged}
      />
    </>
  );
};

export default CreateQuizz;