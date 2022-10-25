import type { Quiz } from '@prisma/client';
import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import CloseButton from '../../CloseButton/CloseButton';
import styles from './AdminQuizDetails.module.scss';
import trash from '../../../public/icons/delete.svg';
import restore from '../../../public/icons/restore.svg';
import Image from 'next/image';
import AdminQuizQuestions from '../AdminQuizQuestions/AdminQuizQuestions';
import ImageButton from '../../ImageButton/ImageButton';

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
  setQuizDetails: Dispatch<SetStateAction<Quiz>>,
  handleModerateQuiz: (id: string, is_visible: boolean) => void,
  handleDeleteQuiz: (id: string) => void
};

const AdminQuizDetails: FunctionComponent<Props> = ({
  quiz,
  setQuizDetails,
  handleModerateQuiz,
  handleDeleteQuiz
}) => {

  const router = useRouter();

  return (
    // <div className={styles.modal}>
    <>
      <div
        className={styles.behind}
        onClick={() => setQuizDetails(emptyQuiz)}
      ></div>

      <section
        className={styles.card}>
        <header className={styles.header}>
          <h5 className={styles.title}>
            Titre :
            <span className={styles.title__span}>
              {quiz.title}
            </span>
          </h5>

          <CloseButton
            handleFunction={() => setQuizDetails(emptyQuiz)}
          />
        </header>

        <div className={styles.body}>
          
          <p className={styles.text}>
            <span className={styles.span__nbOfQuestions}>
              {quiz.nbOfQuestions}
            </span>
            {quiz.nbOfQuestions < 2 ? 'question' : 'questions'}
          </p>
          
          <p className={styles.text}>
            Créé par
            <span
              title={`Voir le profil de ${quiz.creator}`}
              aria-label={`Voir le profil de ${quiz.creator}`}
              className={`${styles.span} ${styles.span__creator}`}
              onClick={() => router.push(`/profile/${quiz.creator}`)}
            >
              {quiz.creator}
            </span>
          </p>
          
          <p className={styles.text}>
            Le
            <span className={styles.span}>
              {quiz.date}
            </span>
          </p>
          
          <p className={styles.text}>
            Catégorie :
            <span className={styles.span}>
              {quiz.category}
            </span>
          </p>
          
          <p className={styles.text}>
            Difficulté :
            <span className={styles.span}>
              {quiz.difficulty}
            </span>
          </p>
        </div>

        <div className={
          quiz.is_visible ? 
            `${styles.button}`
          :
            `${styles.buttons}`
        }>

          {!quiz.is_visible && (
            <button
              className={styles.delete}
              type='button'
              title="Supprimer définitivement ce quiz"
              aria-label="Supprimer définitivement ce quiz"
              onClick={() => handleDeleteQuiz(quiz.id)}
            >
              Supprimer définitivement
            </button>
          )}

          <ImageButton
            title={quiz.is_visible ? "Envoyer ce quiz à la corbeille" : "Restaurer ce quiz"}
            img={quiz.is_visible ? trash : restore}
            alt={quiz.is_visible ? 'Petite poubelle avec une croix' : 'Petite poubelle avec une flèche qui en ressort'}
            handleFunction={() => handleModerateQuiz(quiz.id, quiz.is_visible)}
          />
        </div>

        <AdminQuizQuestions
          id={quiz.id}
        />
      </section>
    </>
    // </div>
  );
};

export default AdminQuizDetails;