import { Question } from '@prisma/client';
import { FunctionComponent } from 'react';
import styles from './GameAnswer.module.scss';

type Props = {
  currentQuestion: Question,
  questionNumber: number,
  goodAnswer: boolean,
  handleNextQuestion: () => void
};

const GameAnswer: FunctionComponent<Props> = ({
  currentQuestion,
  questionNumber,
  goodAnswer,
  handleNextQuestion
}) => {

  return (
    <>
      <p className={
        goodAnswer ?
          `${styles.answer} ${styles.answer__right}`
        :
          `${styles.answer} ${styles.answer__wrong}`
      }>
        {goodAnswer ?
          "Bonne réponse !"
        : 
          <>
            Mauvaise réponse
            <br/>
            <br/>
            La bonne réponse était {currentQuestion.answer}
          </>
        }
      </p>


      {currentQuestion.description &&
        <aside className={styles.description}>
          {currentQuestion.description}
        </aside>
      }

      <button
        className={styles.next}
        type="button"
        aria-label={questionNumber < 10 ? "Passer à la question suivante" : "Terminer la partie"}
        title={questionNumber < 10 ? "Passer à la question suivante" : "Terminer la partie"}
        onClick={handleNextQuestion}
      >
        {questionNumber < 10 ? "Question suivante" : "Terminer"}
      </button>
    </>
  );
};

export default GameAnswer;