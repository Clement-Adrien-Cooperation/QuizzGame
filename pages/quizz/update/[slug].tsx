import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import QuizEdit from '../../../components/QuizEdit/QuizEdit';

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
      console.error(error);
    });
  };

  return (
    <>
      <QuizEdit
        userLogged={userLogged}
      />

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default UpdateQuiz;