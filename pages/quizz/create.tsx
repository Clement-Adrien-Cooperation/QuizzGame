import { User } from '@prisma/client';
import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import EditQuiz from '../../components/EditQuiz/EditQuiz';

type Props = {
  isLogged: boolean,
  userLogged: User
};

const CreateQuizz: NextPage<Props> = ({
  isLogged,
  userLogged
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
      />
    </>
  );
};

export default CreateQuizz;