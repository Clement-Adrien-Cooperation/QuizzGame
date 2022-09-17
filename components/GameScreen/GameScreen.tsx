import { Question } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import GameAnswer from '../GameAnswer/GameAnswer';
import GameOver from '../GameOver/GameOver';
import GameProposals from '../GameProposals/GameProposals';
import styles from './GameScreen.module.scss';

type Props = {
  currentQuestion: Question,
  currentProposals: string[],
  currentIndex: number,
  nextQuestion: () => void
};

const GameScreen: FunctionComponent<Props> = ({
  currentQuestion,
  currentProposals,
  currentIndex,
  nextQuestion
}) => {
  
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [goodAnswer, setGoodAnswer] = useState<boolean>(false);
  
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
      setGameOver(true);
    } else {
      // Launch next question
      nextQuestion();
    };

    setShowAnswer(false);
  };

  return (
    <main className={styles.game}>
      {gameOver ?
        <GameOver
          score={score}
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