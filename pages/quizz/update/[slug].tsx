import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import EditQuiz from '../../../components/EditQuiz/EditQuiz';
import styles from '../../../styles/UpdateQuizz.module.scss';

const UpdateQuiz: NextPage = ({
  isLogged,
  userLogged,
  checkToken
}: any) => {
  
  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(true);
  
  useEffect(() => {

    document.title = `Modifier "${router.query.slug}" - s'Quizz Game`;

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
      <div className={styles.container}>

        <EditQuiz
          userLogged={userLogged}
        />
        
      </div>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default UpdateQuiz;