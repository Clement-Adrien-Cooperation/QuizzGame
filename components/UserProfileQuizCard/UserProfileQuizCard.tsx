import { Quiz } from '@prisma/client';
import { useRouter } from 'next/router';
import { FunctionComponent, useEffect, useState } from 'react';
import Stars from '../Stars/Stars';
import styles from './UserProfileQuizCard.module.scss';

type Props = {
  quiz: Quiz
};

const UserProfileQuizCard: FunctionComponent<Props> = ({
  quiz
}) => {

  const router = useRouter();

  const [backgroundColor, setBackgroundColor] = useState<string>('var(--yellow)');

  useEffect(() => {
    switch (true) {
      case quiz.difficulty === 'Très facile' :
        setBackgroundColor('var(--white)');
      break;
      case quiz.difficulty === 'Facile' :
        setBackgroundColor('var(--green)');
      break;
      case quiz.difficulty === 'Normal' :
        setBackgroundColor('var(--yellow)');
      break;
      case quiz.difficulty === 'Difficile' :
        setBackgroundColor('var(--orange)');
      break;
      case quiz.difficulty === 'Très difficile' :
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
      onClick={() => router.push(`/quizz/${quiz.title}`)}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>
          {quiz.title}
        </h2>
      </header>

      <section className={styles.body}>

        <span
          className={styles.difficulty}
          style={{background: `${backgroundColor}`}}
        >
          {quiz.difficulty}
        </span>

        <span className={styles.questions}>
          {quiz.nbOfQuestions} question{quiz.nbOfQuestions < 2 ? '' : 's'}
        </span>

        <span className={styles.category}>
          {quiz.category}
        </span>

        <span className={styles.date}>
          {quiz.date}
        </span>

        {quiz.rate === null ? '' :

          <span className={styles.rate}>
            <Stars
              rate={quiz.rate}
            />
          </span>
        }
      </section>
    </article>
  );
};

export default UserProfileQuizCard;