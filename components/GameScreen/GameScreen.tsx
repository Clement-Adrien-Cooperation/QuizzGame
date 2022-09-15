import { Question } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  
  const handleUserAnswer = async (userAnswer: string) => {



    nextQuestion();
  };

  return (
    <main className={styles.game}>
      <header className={styles.header}>
        <span className={styles.span}>
          Question n°{questionNumber} :
        </span>

        <h1 className={styles.question}>
          {currentQuestion?.question}
        </h1>
      </header>

      <section className={styles.proposals}>
        <ul className={styles.list}>
          {currentProposals?.map(proposal =>
            <li
              className={styles.proposal}
              key={uuidv4()}
            >
              <button
                className={styles.button}
                type="button"
                aria-label={`Répondre "${proposal}"`}
                title={`Répondre "${proposal}"`}
                onClick={() => handleUserAnswer(proposal)}
              >
                {proposal}
              </button>
            </li>
          )}
        </ul>
      </section>
    </main>
  );
};

export default GameScreen;