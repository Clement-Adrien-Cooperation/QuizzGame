import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import EditQuiz from '../../../components/EditQuiz/EditQuiz';
import styles from '../../../styles/UpdateQuizz.module.scss';

const UpdateQuiz: NextPage = ({ isLogged, userLogged }:any) => {
  
  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {

    if(isLogged) {
      getQuizAndCheckUser();
    } else {
      router.push('/');
    };
  }, []);

  const getQuizAndCheckUser = async () => {

    const title = router.query.slug;

    await fetch('/api/quizz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    .then(async(res) => {
      const data = await res.json();

      if(userLogged.id !== data.user_id) {
        router.push('/');
      };
    })
    .then(() => {
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

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