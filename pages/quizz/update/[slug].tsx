import { User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect } from 'react';
import EditQuiz from '../../../components/EditQuiz/EditQuiz';
import styles from '../../../styles/UpdateQuizz.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const UpdateQuiz: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader
}) => {
  
  const router = useRouter();
  
  useEffect(() => {

    document.title = `Modifier "${router.query.slug}" - s'Quizz Game`;

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
      <div className={styles.container}>

        <EditQuiz
          userLogged={userLogged}
          setShowLoader={setShowLoader}
        />
        
      </div>
    </>
  );
};

export default UpdateQuiz;