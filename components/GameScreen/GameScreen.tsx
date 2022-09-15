import { Question } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import GameAnswer from '../GameAnswer/GameAnswer';
import GameOver from '../GameOver/GameOver';
import GameProposals from '../GameProposals/GameProposals';
import styles from './GameScreen.module.scss';

type Props = {
  currentQuestion: Question,
  currentProposals: string[],
  nextQuestion: () => void
};

const GameScreen: FunctionComponent<Props> = ({
  currentQuestion,
  currentProposals,
  nextQuestion
}) => {

  const [questionNumber, setQuestionNumber] = useState<number>(1);
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
    if(questionNumber >= 10) {
      // Game if over
      setGameOver(true);
    } else {
      // Incremente question number
      setQuestionNumber(questionNumber + 1);
      // Launch
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
            Question n°{questionNumber} :
          </span>

          <h1 className={styles.question}>
            {currentQuestion?.question}
          </h1>
        </header>

        {showAnswer ?
          <GameAnswer
            currentQuestion={currentQuestion}
            questionNumber={questionNumber}
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