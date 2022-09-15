import { Quiz } from '@prisma/client';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { api } from '../../api/api';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './UserQuizCard.module.scss';
import playIcon from '../../public/icons/play.svg';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';

type Props = {
  quiz: Quiz,
  getQuizzFromUser: () => void,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const UserQuizCard: FunctionComponent<Props> = ({
  quiz,
  getQuizzFromUser,
  setShowLoader
}) => {

  const router = useRouter();

  const handleDeleteQuiz = async () => {

    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/quiz/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ id: quiz.id })
    })
    .then(() => {
      getQuizzFromUser();
    })
    .catch((error) => {
      console.log(error);
      setShowLoader(false);
    });

    setShowLoader(false);
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <h3
          className={styles.title}
          title={`${quiz.title}`}
          aria-label={`${quiz.title}`}
        >
          {quiz.title}
        </h3>
      
        <span className={styles.category}>
          {quiz.category}
        </span>
      </header>

      <section className={styles.buttons}>
        <button
          className={styles.button}
          type='button'
          title='Jouer à ce quiz'
          aria-label='Jouer à ce quiz'
          onClick={() => router.push(`/quizz/${quiz.title}`)}
        >
          <div className={styles.icon}>
            <Image
              src={playIcon}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Un triangle qui pointe vers la droite'
            />
          </div>
        </button>
        <button
          className={styles.button}
          type='button'
          title='Modifier ce quiz'
          aria-label='Modifier ce quiz'
          onClick={() => router.push(`/quizz/update/${quiz.title}`)}
        >
          <div className={styles.icon}>
            <Image
              src={editIcon}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Un crayon avec une gomme'
            />
          </div>
        </button>
        <button
          className={styles.button}
          type='button'
          title='Supprimer ce quiz'
          aria-label='Supprimer ce quiz'
          onClick={handleDeleteQuiz}
        >
          <div className={styles.icon}>
            <Image
              src={deleteIcon}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Une poubelle avec une croix dessinée dessus'
            />
          </div>
        </button>
      </section>

      <footer className={styles.footer}>

        {quiz.reported && (
          <span
            className={styles.warning}
            title="Ce quiz a été signalé par un utilisateur, cliquez pour en savoir plus"
            aria-label="Ce quiz a été signalé par un utilisateur, cliquez pour en savoir plus"
            onClick={() => console.log('⚠️ Ouvrir une modal de détails ⚠️')}
          >
            ⚠️
          </span>
        )}

        {!quiz.is_visible && (
          <span
            className={styles.warning}
            title="Ce quiz a été supprimé par la modération, cliquez pour en savoir plus"
            aria-label="Ce quiz a été supprimé par la modération, cliquez pour en savoir plus"
            onClick={() => console.log('⚠️ Ouvrir une modal de détails ⚠️')}
          >
            🚫
          </span>
        )}

      </footer>
    </article>
  );
};

export default UserQuizCard;