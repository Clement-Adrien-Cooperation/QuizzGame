import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import EditQuiz from '../../components/EditQuiz/EditQuiz';

const CreateQuizz: NextPage = ({
  isLogged,
  userLogged,
  checkToken
}: any) => {

  const router = useRouter();
  
  useEffect(() => {

    document.title = `Créer mon quiz - s'Quizz Game`;

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    } else {
      const token = localStorage.getItem('token');

      if(token) {
        checkToken(token);
      } else {
        router.push('/');
      };
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