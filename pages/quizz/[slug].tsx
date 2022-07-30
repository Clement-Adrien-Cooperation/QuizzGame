import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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
      <header>
        <h1>
          Bienvenur sur le quizz {router.query.slug} !
        </h1>
      </header>

    </>
  );
};

export default QuizGame;