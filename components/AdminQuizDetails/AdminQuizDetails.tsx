import { useRouter } from 'next/router';
import CloseButton from '../CloseButton/CloseButton';
import styles from './AdminQuizDetails.module.scss';
import trash from '../../public/icons/delete.svg';
import restore from '../../public/icons/restore.svg';
import Image from 'next/image';
import AdminQuizQuestions from '../AdminQuizQuestions/AdminQuizQuestions';

type QuizTypes = {
  id: string,
  user_id: string,
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

type AdminQuizDetailsProps = {
  quiz: QuizTypes,
  setQuizDetails: React.Dispatch<React.SetStateAction<QuizTypes>>,
  handleModerateQuiz: Function,
  handleDeleteQuiz: Function
};

const emptyQuiz: QuizTypes = {
  id: '',
  user_id: '',
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

const AdminQuizDetails = ({
  quiz,
  setQuizDetails,
  handleModerateQuiz,
  handleDeleteQuiz
}: AdminQuizDetailsProps) => {

  const router = useRouter();

  return (
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

        {quiz.reported && (
          <aside className={styles.reported}>
            <button
              className={styles.reported__button}
              type='button'
              title='Voir le(s) signalement(s) lié(s) à ce quiz'
              aria-label='Voir le(s) signalement(s) lié(s) à ce quiz'
              onClick={() => router.push('/admin/reports')}
            >
              ⚠️ Ce quiz a été signalé ⚠️
            </button>
          </aside>
        )}

        <div className={styles.body}>
          
          <p className={styles.text}>
            Créateur :
            <span
              className={`${styles.span} ${styles.span__creator}`}
              onClick={() => router.push(`/profile/${quiz.creator}`)}
            >
              {quiz.creator}
            </span>
          </p>
          
          <p className={styles.text}>
            Créé le :
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

          <button
            className={styles.moderate}
            type='button'
            title={quiz.is_visible ? "Envoyer ce quiz à la corbeille" : "Restaurer ce quiz"}
            aria-label={quiz.is_visible ? "Envoyer ce quiz à la corbeille" : "Restaurer ce quiz"}
            onClick={() => handleModerateQuiz(quiz.id, quiz.is_visible)}
          >
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt={quiz.is_visible ? 'Petite poubelle avec une croix' : 'Petite poubelle avec une flèche qui en ressort'}
              src={quiz.is_visible ? trash : restore}
            />
          </button>
        </div>

        <AdminQuizQuestions
          id={quiz.id}
        />
      </section>
    </>
  );
};

export default AdminQuizDetails;