import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/quizz/QuizGame.module.scss';

type QuizTypes = {
  id?: number,
  user_id: number,
  creator: string,
  title: string,
  category?: string,
  lang?: string,
  difficulty?: string,
  is_visible: boolean,
  date: string,
  reported?: boolean,
  reportMessage?: string
};

const emptyQuiz = {
  id: 0,
  user_id: 0,
  creator: '',
  title: '',
  category: '',
  lang: '',
  difficulty: '',
  is_visible: true,
  date: '',
  reported: false,
  reportMessage: ''
};

const QuizGame: NextPage = ({ isLogged, userLogged }:any) => {
  
  const router = useRouter();
  const title = router.query.slug;

  const [quiz, setQuiz] = useState<QuizTypes>(emptyQuiz);

  useEffect(() => {

    document.title = `${title} - s'Quizz Game`;

    getQuiz();

  }, []);

  const getQuiz = async () => {

    await fetch('/api/quizz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    .then(async(res) => {
      const data = await res.json();

      setQuiz(data);
    })
    .catch((error) => {
      console.error(error);
    }); 
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {quiz.title}
        </h1>
      </header>
    </>
  );
};

export default QuizGame;