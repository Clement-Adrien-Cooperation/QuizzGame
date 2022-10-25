import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { useState } from 'react';
import AdminQuizDetails from '../AdminQuizDetails/AdminQuizDetails';
import styles from './AdminQuizCard.module.scss';

const emptyQuiz: Quiz = {
  id: '',
  user_id: '',
  creator: '',
  title: '',
  category: '',
  difficulty: '',
  is_visible: false,
  date: '',
  nbOfQuestions: 0,
  nbOfPlayed: 0,
  rate: [],
  rates_IDs: []
};

type Props = {
  quiz: Quiz,
  handleModerateQuiz: (id: string, is_visible: boolean) => void,
  handleDeleteQuiz: (id: string) => void
};

const AdminQuizCard: FunctionComponent<Props> = ({
  quiz,
  handleModerateQuiz,
  handleDeleteQuiz
}) => {

  const [quizDetails, setQuizDetails] = useState<Quiz>(emptyQuiz);

  return (
    <>
      <section
        className={styles.card}
        title={`Voir les détails du quiz "${quiz.title}"`}
        aria-label={`Voir les détails du quiz "${quiz.title}"`}
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

      {quizDetails.id !== '' &&
        <AdminQuizDetails
          quiz={quiz}
          setQuizDetails={setQuizDetails}
          handleModerateQuiz={handleModerateQuiz}
          handleDeleteQuiz={handleDeleteQuiz}
        />
      }
    </>
  );
};

export default AdminQuizCard;