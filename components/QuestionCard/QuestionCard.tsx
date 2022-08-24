import { useState } from 'react';
import Image from 'next/image';
import styles from './QuestionCard.module.scss';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';
import arrow from '../../public/icons/arrow.svg';
import QuestionDetails from '../QuestionDetails/QuestionDetails';

type QuestionTypes = {
  id: string,
  quizz_id: string,
  question: string,
  description: string,
  proposals: string[],
  answer: string,
  reported?: boolean,
  reportMessage?: string
};

type QuestionCardProps = {
  questions: QuestionTypes[],
  id: string,
  quizz_id: string,
  question: string,
  answer: string,
  proposals: string[],
  description: string,
  setQuestions: React.Dispatch<React.SetStateAction<QuestionTypes[]>>,
  updateQuestion: Function,
  setUpdating: React.Dispatch<React.SetStateAction<boolean>>,
  questionIndex: number,
  setUpdateIndex: React.Dispatch<React.SetStateAction<number>>
};

const QuestionCard = ({
  questions,
  setQuestions,
  id,
  quizz_id,
  question,
  answer,
  proposals,
  description,
  updateQuestion,
  setUpdating,
  questionIndex,
  setUpdateIndex
}: QuestionCardProps) => {

  const [showDetails, setShowDetails] = useState(false);

  const handleUpdateQuestion = () => {

    setUpdating(true);
    setUpdateIndex(questionIndex);
    
    const questionData = {
      id,
      quizz_id,
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
        <h3 className={styles.question}>
          {question}
        </h3>

        <aside className={styles.buttons}>
          <button
            className={styles.icon}
            type='button'
            title='Détails de la question'
            aria-label='Détails de la question'
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