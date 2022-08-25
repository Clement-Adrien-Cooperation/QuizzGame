import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './UserQuizCard.module.scss';
import playIcon from '../../public/icons/play.svg';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';
import Loader from '../Loader/Loader';

type UserQuizCardProps = {
  id: string,
  title: string,
  category: string,
  lang: string,
  difficulty: string,
  is_visible: boolean,
  date: string,
  reported?: boolean,
  reportMessage?: string,
  getQuizzFromUser: Function
};

const UserQuizCard = ({
  id,
  title,
  category,
  lang,
  difficulty,
  is_visible,
  date,
  reported,
  reportMessage,
  getQuizzFromUser
}: UserQuizCardProps) => {

  const router = useRouter();
  
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleDeleteQuiz = async () => {

    setShowLoader(true);

    await fetch('/api/quiz/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(async() => {

      console.log('entré dans le then');
      setShowLoader(false);
      
      
      await getQuizzFromUser();
    })
    .catch((error) => {
      console.log('entré dans le catch');
      
      console.log(error);
      setShowLoader(false);
    });

    setShowLoader(false);
  };

  return (
    <>
      <section className={styles.card} key={id}>
        <header className={styles.header}>
          <h3
            className={styles.title}
            title={`${title}`}
            aria-label={`${title}`}
          >
            {title}
          </h3>
        
          <span className={styles.category}>
            {category}
          </span>
        </header>

        <footer className={styles.footer}>
          <button
            className={styles.button}
            type='button'
            title='Jouer à ce quiz'
            aria-label='Jouer à ce quiz'
            onClick={() => router.push(`/quizz/${title}`)}
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
            onClick={() => router.push(`/quizz/update/${title}`)}
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