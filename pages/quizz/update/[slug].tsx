import { User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import EditQuiz from '../../../components/EditQuiz/EditQuiz';
import styles from '../../../styles/UpdateQuizz.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User
};

const UpdateQuiz: NextPage<Props> = ({
  isLogged,
  userLogged
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
        />
        
      </div>
    </>
  );
};

export default UpdateQuiz;