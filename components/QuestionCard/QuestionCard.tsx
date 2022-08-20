import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './QuestionCard.module.scss';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';
import arrow from '../../public/icons/arrow.svg';
import Loader from '../Loader/Loader';
import { useState } from 'react';
import QuestionDetails from '../QuestionDetails/QuestionDetails';

type QuestionCardProps = {
  id: number,
  quizz_id: number,
  question: string,
  answer: string,
  proposals: string[],
  description: string,
  setQuestions: Function,
  updateQuestion: Function,
  setUpdating: Function,
  questionIndex: number,
  setUpdateIndex: Function
};

const QuestionCard = ({
  id,
  quizz_id,
  question,
  answer,
  proposals,
  description,
  setQuestions,
  updateQuestion,
  setUpdating,
  questionIndex,
  setUpdateIndex
}: QuestionCardProps) => {

  const [showLoader, setShowLoader] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDeleteQuestion = async () => {

    setShowLoader(true);

    await fetch('/api/question/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(() => {

      getQuestionsFromQuiz();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const getQuestionsFromQuiz = async () => {

    await fetch('/api/question/getAllFromQuiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizz_id })
    })
    .then(async(res) => {
      const data = await res.json();
      
      await setQuestions(data);
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

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

  return (
    <>
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
              className={showDetails ?
                `${styles.icon} ${styles.rotated}`
              :
                `${styles.icon}`
              }
              type='button'
              title='Détails de la question'
              aria-label='Détails de la question'
              onClick={() => setShowDetails(!showDetails)}
            >
              <Image
                src={arrow}
                width='32px'
                height='32px'
                layout='responsive'
                alt='Une flèche vers le bas'
              />
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

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default QuestionCard;