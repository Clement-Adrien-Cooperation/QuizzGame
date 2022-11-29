import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { Question } from '@prisma/client';
import { useState } from 'react';
import styles from './QuestionCard.module.scss';

import QuestionDetails from '../QuestionDetails/QuestionDetails';
import IconTrash from '../../Icons/IconTrash';
import IconButton from '../../IconButton/IconButton';
import IconPen from '../../Icons/IconPen';
import IconArrow from '../../Icons/IconArrow';

type Props = {
  questions: Question[],
  id: string,
  quiz_id: string,
  question: string,
  answer: string,
  proposals: string[],
  description: string,
  setQuestions: Dispatch<SetStateAction<Question[]>>,
  updateQuestion: Function,
  setUpdating: Dispatch<SetStateAction<boolean>>,
  questionIndex: number,
  setUpdateIndex: Dispatch<SetStateAction<number>>
};

const QuestionCard: FunctionComponent<Props> = ({
  questions,
  setQuestions,
  id,
  quiz_id,
  question,
  answer,
  proposals,
  description,
  updateQuestion,
  setUpdating,
  questionIndex,
  setUpdateIndex
}) => {

  const [showDetails, setShowDetails] = useState(false);

  const handleUpdateQuestion = () => {

    setUpdating(true);
    setUpdateIndex(questionIndex);
    
    const questionData = {
      id,
      quiz_id,
      question,
      answer,
      proposals,
      description
    };

    updateQuestion(questionData);
  };

  const handleDeleteQuestion = () => {
    const previousQuestions = [...questions];
    
    previousQuestions.splice(questionIndex, 1);

    setQuestions(previousQuestions);
  };

  return (
    <section
      className={showDetails ?
        `${styles.card} ${styles.opened}`
      :
        `${styles.card}`}
    >
      <header className={styles.header}>
        <h3
          className={styles.question}
          title={question}
        >
          {question}
        </h3>

        <aside className={styles.buttons}>
          <button
            className={styles.icon}
            type='button'
            title={showDetails ? "Cacher les détails" : "Voir les détails"}
            aria-label={showDetails ? "Cacher les détails" : "Voir les détails"}
            onClick={() => setShowDetails(!showDetails)}
          >
            <span
              className={showDetails ?
                `${styles.arrow_icon} ${styles.rotated}`
              :
                `${styles.arrow_icon}`
              }
            >
              <IconArrow />
            </span>
          </button>

          <IconButton
            title='Modifier cette question'
            handleFunction={handleUpdateQuestion}
          >
            <IconPen />
          </IconButton>

          <IconButton
            title='Supprimer cette question'
            handleFunction={handleDeleteQuestion}
          >
            <IconTrash />
          </IconButton>
        </aside>
      </header>

      {showDetails && (
        <QuestionDetails
          answer={answer}
          proposals={proposals}
          description={description}
        />
      )}
    </section>
  );
};

export default QuestionCard;