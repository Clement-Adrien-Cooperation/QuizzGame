import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './QuestionCard.module.scss';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';
import Loader from '../Loader/Loader';
import { useState } from 'react';

type QuestionCardProps = {
  id: number,
  quizz_id: number,
  question: string,
  answer: string,
  propositions: string[],
  description?: string,
  setQuestions: Function
};

const QuestionCard = ({
  id,
  quizz_id,
  question,
  answer,
  propositions,
  description,
  setQuestions
}: QuestionCardProps) => {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState(false);

  const handleDeleteQuestion = async () => {

    setShowLoader(true);

    await fetch('/api/question/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(async(res) => {
      const data = await res.json();

      console.log(data);
      await getQuestionsFromQuiz();
    })
    .catch((error) => {
      console.error(error);
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
      console.error(error);
    });
  };

  return (
    <>
      <section className={styles.card}>
        <header className={styles.header}>
          <h3 className={styles.question}>
            {question}
          </h3>

          <p className={styles.answer}>
            {answer}
          </p>
        </header>

        <section>
          <ul className={styles.propositions}>
            {propositions.map((proposition, index) =>
              <li key={index}>
                {proposition}
              </li>  
            )}
          </ul>
        </section>

        {description && (
          <section>
            <p>
              {description}
            </p>
          </section>
        )}

        <footer>
          <button
            className={styles.button}
            onClick={() => router.push(`/question/update/${id}`)}
          >
            <div className={styles.icon}>
              <Image
                src={editIcon}
                width='32px'
                height='32px'
                layout='responsive'
                alt='Modifier'
              />
            </div>
          </button>

          <button
            className={styles.icon}
            // className={styles.button}
            onClick={handleDeleteQuestion}
          >
            {/* <div className={styles.icon}> */}
              <Image
                src={deleteIcon}
                width='32px'
                height='32px'
                layout='responsive'
                alt='Supprimer'
              />
            {/* </div> */}
          </button>
        </footer>
      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default QuestionCard;