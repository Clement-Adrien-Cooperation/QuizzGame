import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './QuizCard.module.scss';
import defaultImage from '../../public/icons/defaultImage.svg';
import Stars from '../Stars/Stars';

type QuizCardProps = {
  id: number,
  creator: string,
  title: string,
  nbOfQuestions: number,
  difficulty: string,
  image: string,
  category: string,
  date: string;
  rate: number;
};

const QuizCard = ({
  id,
  creator,
  title,
  nbOfQuestions,
  difficulty,
  image,
  category,
  date,
  rate
} :QuizCardProps) => {

  const router = useRouter();

  const [backgroundColor, setBackgroundColor] = useState<string>('var(--yellow)');

  useEffect(() => {
    switch (true) {
      case difficulty === 'Très facile' :
        setBackgroundColor('var(--white)');
      break;
      case difficulty === 'Facile' :
        setBackgroundColor('var(--green)');
      break;
      case difficulty === 'Normal' :
        setBackgroundColor('var(--yellow)');
      break;
      case difficulty === 'Difficile' :
        setBackgroundColor('var(--orange)');
      break;
      case difficulty === 'Très difficile' :
        setBackgroundColor('var(--red)');
      break;
        
      default:
        setBackgroundColor('var(--yellow)');
      break;
    };
  }, []);

  return (
    <article className={styles.card}>

      <section
        className={styles.container}
        title='Jouer à ce quiz'
        aria-label='Jouer à ce quiz'
        onClick={() => router.push(`/quizz/${title}`)}
      >
        <header className={styles.header}>

          <aside className={styles.header__aside}>

            <h2 className={styles.header__aside__title}>
              {title}
            </h2>

            <span
              className={styles.header__aside__difficulty}
              style={{background: `${backgroundColor}`}}
            >
              {difficulty}
            </span>

          </aside>
        </header>

        <section className={styles.body}>

          <div className={styles.body__content}>

            <span className={styles.category}>
              {category}
            </span>

            <span className={styles.questions_number}>
              {nbOfQuestions} {nbOfQuestions === 1 ? 'question' : 'questions'}
            </span>

          </div>

          {rate === null ? '' :
            <span className={styles.rate}>
              
              <Stars
                rate={rate}
              />
            </span>
          }
        </section>

      </section>

      <footer className={styles.footer}>

        <p>
          Créé par

          <button
            className={styles.footer__link}
            type='button'
            title={`Voir tous les quizz de ${creator}`}
            aria-label={`Voir tous les quizz de ${creator}`}
            onClick={() => router.push(`/profile/${creator}`)}
          >
            {creator}
          </button>
        </p>

        <p className={styles.date}>
          {date}
        </p>
      </footer>
      
    </article>
  );
};

export default QuizCard;