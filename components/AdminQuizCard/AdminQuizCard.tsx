import { useState } from 'react';
import AdminQuizDetails from '../AdminQuizDetails/AdminQuizDetails';
import styles from './AdminQuizCard.module.scss';

type QuizTypes = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: boolean,
  date: string,
  rate: number,
  reported: boolean
};

type QuizProps = {
  quiz: QuizTypes,
  handleModerateQuiz: Function,
  handleDeleteQuiz: Function
};

const emptyQuiz: QuizTypes = {
  id: 0,
  user_id: 0,
  creator: '',
  title: '',
  category: '',
  difficulty: '',
  lang: '',
  image: '',
  is_visible: false,
  date: '',
  rate: 0,
  reported: false
};

const AdminQuizCard = ({
  quiz,
  handleModerateQuiz,
  handleDeleteQuiz
}: QuizProps) => {

  const [quizDetails, setQuizDetails] = useState<QuizTypes>(emptyQuiz);

  return (
    <>
      <section
        className={styles.card}
        title="Voir les détails de ce quiz"
        aria-label="Voir les détails de ce quiz"
        onClick={() => setQuizDetails(quiz)}
      >
        <header className={styles.header}>
          <h3 className={styles.title}>
            {quiz.title}
          </h3>

          <span className={styles.category}>
            {quiz.category}
          </span>
        </header>

        <div className={styles.details}>
          <h4 className={styles.creator}>
            Créé par {quiz.creator}
          </h4>

          <span className={styles.span}>
            le {quiz.date}
          </span>
        </div>

      </section>

      {quizDetails.id === 0 ? '' : (
        <AdminQuizDetails
          quiz={quiz}
          setQuizDetails={setQuizDetails}
          handleModerateQuiz={handleModerateQuiz}
          handleDeleteQuiz={handleDeleteQuiz}
        />
      )}
    </>
  );
};

export default AdminQuizCard;