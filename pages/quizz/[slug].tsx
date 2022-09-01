import { Quiz, User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import styles from '../../styles/quizz/QuizGame.module.scss';

const emptyQuiz: Quiz = {
  id: '',
  user_id: '',
  creator: '',
  title: '',
  category: '',
  difficulty: '',
  is_visible: true,
  date: '',
  nbOfQuestions: 0,
  rate: 0,
  reported: false,
  reportMessage: []
};

type Props = {
  isLogged: boolean,
  userLogged: User,
  checkToken: (token: string) => void
};

const QuizGame: NextPage<Props> = ({
  isLogged,
  userLogged,
  checkToken
}) => {
  
  const router = useRouter();
  const title = router.query.slug;

  const [quiz, setQuiz] = useState<Quiz>(emptyQuiz);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  
  useEffect(() => {

    document.title = `${title} - s'Quizz Game`;

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    } else {
      const token = localStorage.getItem('token');

      if(token) {
        checkToken(token);
      };
    };

    getQuiz();
  }, []);

  const getQuiz = async () => {

    await fetch('/api/quiz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    .then(async(res) => {
      const data = await res.json();

      setQuiz(data);
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
      <header className={styles.header}>
        <h1 className={styles.title}>
          {quiz.title}
        </h1>
      </header>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default QuizGame;