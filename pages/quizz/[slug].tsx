import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import QuizEdit from '../../components/QuizEdit/QuizEdit';
import styles from './QuizGame.module.scss';

const router = useRouter();

const QuizGame: NextPage = ({ isLogged, userLogged }:any) => {

  useEffect(() => {

    document.title = `${router.query.slug} - s'Quizz Game`;

    if(!isLogged) {
      router.push('/');
    };

  }, []);

  return (
    <>
      <QuizEdit
        userLogged={userLogged}
      />
    </>
  );
};

export default QuizGame;