import type { FunctionComponent } from 'react';
import type { Question } from '@prisma/client';
import styles from './GameAnswer.module.scss';

type Props = {
  currentQuestion: Question,
  currentIndex: number,
  goodAnswer: boolean,
  handleNextQuestion: () => void
};

const GameAnswer: FunctionComponent<Props> = ({
  currentQuestion,
  currentIndex,
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
            La bonne réponse était : 
            <br/>
            <br/>
            "{currentQuestion.answer}"
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
        aria-label={currentIndex < 10 ? "Passer à la question suivante" : "Voir mon score"}
        title={currentIndex < 10 ? "Passer à la question suivante" : "Voir mon score"}
        onClick={handleNextQuestion}
      >
        {currentIndex < 10 ? "Question suivante" : "Résultats"}
      </button>
    </>
  );
};

export default GameAnswer;