import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Stars from '../Stars/Stars';
import styles from './UserProfileQuizCard.module.scss';

type UserProfileQuizCardProps = {
  title: string,
  category: string,
  difficulty: string,
  nbOfQuestions: number,
  date: string,
  rate: number
};

const UserProfileQuizCard = ({
  title,
  category,
  difficulty,
  nbOfQuestions,
  date,
  rate
}: UserProfileQuizCardProps) => {

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
    <article
      className={styles.card}
      title="Jouer à ce quiz"
      aria-label="Jouer à ce quiz"
      onClick={() => router.push(`/quizz/${title}`)}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>
          {title}
        </h2>
      </header>

      <section className={styles.body}>

        <span
          className={styles.difficulty}
          style={{background: `${backgroundColor}`}}
        >
          {difficulty}
        </span>

        <span className={styles.questions}>
          {nbOfQuestions} question{nbOfQuestions < 2 ? '' : 's'}
        </span>

        <span className={styles.category}>
          {category}
        </span>

        <span className={styles.date}>
          {date}
        </span>

        {rate === null ? '' :

          <span className={styles.rate}>
            <Stars
              rate={rate}
            />
          </span>
        }
      </section>
    </article>
  );
};

export default UserProfileQuizCard;