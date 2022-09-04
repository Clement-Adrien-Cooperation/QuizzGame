import { User } from '@prisma/client';
import { NextPage } from 'next';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import EditQuiz from '../../components/EditQuiz/EditQuiz';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const CreateQuizz: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader
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
      />
    </>
  );
};

export default CreateQuizz;