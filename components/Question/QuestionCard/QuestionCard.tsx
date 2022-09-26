import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { Question } from '@prisma/client';
import { useState } from 'react';
import Image from 'next/image';
import styles from './QuestionCard.module.scss';
import editIcon from '../../../public/icons/edit.svg';
import deleteIcon from '../../../public/icons/delete.svg';
import arrow from '../../../public/icons/arrow.svg';
import QuestionDetails from '../QuestionDetails/QuestionDetails';

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
            <div
            className={showDetails ?
              `${styles.arrow_icon} ${styles.rotated}`
            :
              `${styles.arrow_icon}`
            }>
              <Image
                src={arrow}
                width='32px'
                height='32px'
                layout='responsive'
                alt='Une flèche vers le bas'
              />
            </div>
          </button>

          <button
            className={styles.icon}
            type='button'
            title='Modifier la question'
            aria-label='Modifier la question'
            onClick={handleUpdateQuestion}
          >
            <Image
              src={editIcon}
              width='32'
              height='32'
              layout='responsive'
              alt='Un crayon avec une gomme'
            />
          </button>

          <button
            className={styles.icon}
            type='button'
            title='Supprimer la question'
            aria-label='Supprimer la question'
            onClick={handleDeleteQuestion}
          >
            <Image
              src={deleteIcon}
              width='32'
              height='32'
              layout='responsive'
              alt='Une poubelle avec une choix dessinée dessus'
            />
          </button>
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