import { Quiz } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './UserQuizCard.module.scss';
import playIcon from '../../public/icons/play.svg';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';
import Loader from '../Loader/Loader';

type Props = {
  quiz: Quiz,
  getQuizzFromUser: () => void
};

const UserQuizCard: FunctionComponent<Props> = ({
  quiz,
  getQuizzFromUser
}) => {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleDeleteQuiz = async () => {

    setShowLoader(true);

    await fetch('/api/quiz/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: quiz.id })
    })
    .then(async() => {
      setShowLoader(false);

      await getQuizzFromUser();
    })
    .catch((error) => {
      console.log(error);
      setShowLoader(false);
    });

    setShowLoader(false);
  };

  return (
    <>
      <section className={styles.card}>
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

        <footer className={styles.footer}>
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
            onClick={() => handleDeleteQuiz()}
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
        </footer>
      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default UserQuizCard;