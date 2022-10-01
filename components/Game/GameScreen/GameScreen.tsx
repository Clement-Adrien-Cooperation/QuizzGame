import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { Question, Quiz, User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../api/api';
import GameAnswer from '../GameAnswer/GameAnswer';
import GameOver from '../GameOver/GameOver';
import GameProposals from '../GameProposals/GameProposals';
import styles from './GameScreen.module.scss';

type Props = {
  currentQuestion: Question,
  currentProposals: string[],
  currentIndex: number,
  nextQuestion: () => void,
  isLogged: boolean,
  userLogged: User,
  quiz: Quiz,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const GameScreen: FunctionComponent<Props> = ({
  currentQuestion,
  currentProposals,
  currentIndex,
  nextQuestion,
  isLogged,
  userLogged,
  quiz,
  setShowLoader
}) => {

  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [goodAnswer, setGoodAnswer] = useState<boolean>(false);

  const [report, setReport] = useState<boolean>(false);
  
  const handleUserAnswer = (userAnswer: string) => {

    if(userAnswer === currentQuestion.answer) {
      setGoodAnswer(true);
      setScore(score => score + 1);
    } else {
      setGoodAnswer(false);
    };

    setShowAnswer(true);
  };

  const handleNextQuestion = () => {
    // Check if this is the last question
    
    if(currentIndex === 10) {
      // Game if over
      handleGameOver();
      setGameOver(true);
    } else {
      // Launch next question
      nextQuestion();
    };

    setShowAnswer(false);
  };

  const handleGameOver = async () => {

    if(isLogged) {
      const token = localStorage.getItem('token');

      const body = {
        user_id: userLogged.id,
        quiz_id: quiz.id,
        date: new Date().toLocaleDateString(),
        score
      };

      await fetch(`${api}/played/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify(body)
      })
      .then(async(res) => {
        const data = await res.json();
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
    };
  };

  return (
    <main className={styles.game}>
      {gameOver ?
        <GameOver
          score={score}
          isLogged={isLogged}
          quiz={quiz}
          userLogged={userLogged}
        />
      :
       <>
        <header className={styles.header}>
          <span className={styles.span}>
            Question n°{currentIndex} :
          </span>

          <h1 className={styles.question}>
            {currentQuestion?.question}
          </h1>
        </header>

        {showAnswer ?
          <GameAnswer
            currentQuestion={currentQuestion}
            currentIndex={currentIndex}
            goodAnswer={goodAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        :
          <GameProposals
            currentProposals={currentProposals}
            handleUserAnswer={handleUserAnswer}
          />
        }
       </>
      }
    </main>
  );
};

export default GameScreen;