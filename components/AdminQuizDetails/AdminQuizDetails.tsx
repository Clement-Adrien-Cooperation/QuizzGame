import { useEffect, useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './AdminQuizDetails.module.scss';
import trash from '../../public/icons/delete.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

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

type AdminQuizDetailsProps = {
  quiz: QuizTypes,
  setQuizDetails: React.Dispatch<React.SetStateAction<QuizTypes>>,
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

const AdminQuizDetails = ({
  quiz,
  setQuizDetails,
  handleModerateQuiz,
  handleDeleteQuiz
}: AdminQuizDetailsProps) => {

  const router = useRouter();

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);
  }, []);

  const closeQuizDetails = () => {
    setOpened(false);

    setTimeout(() => {
      setQuizDetails(emptyQuiz);
    }, 300);
  };

  return (
    <>
      <div
        className={styles.behind}
        onClick={() => setQuizDetails(emptyQuiz)}
      ></div>

      <section
        className={opened ?
          `${styles.card} ${styles.opened}`
        :
          `${styles.card}`
        }
      >
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
              title='Voir les signalements lié à ce quiz'
              aria-label='Voir les signalements lié à ce quiz'
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

        <footer className={styles.footer}>

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
            title="Envoyer ce quiz à la corbeille"
            aria-label="Envoyer ce quiz à la corbeille"
            onClick={() => handleModerateQuiz(quiz.id, quiz.is_visible)}
          >
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt='Petite poubelle avec une croix'
              src={trash}
            />
          </button>
        </footer>
      </section>
    </>
  );
};

export default AdminQuizDetails;