import { FunctionComponent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './QuizCard.module.scss';
import Stars from '../Stars/Stars';
import { Quiz } from '@prisma/client';

type Props = {
  quiz: Quiz
};

const QuizCard: FunctionComponent<Props> = ({
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
    <article className={styles.card}>

      <section
        className={styles.container}
        title='Jouer à ce quiz'
        aria-label='Jouer à ce quiz'
        onClick={() => router.push(`/quizz/${quiz.title}`)}
      >
        <header className={styles.header}>

          <aside className={styles.header__aside}>

            <h2 className={styles.header__aside__title}>
              {quiz.title}
            </h2>

            <span
              className={styles.header__aside__difficulty}
              style={{background: `${backgroundColor}`}}
            >
              {quiz.difficulty}
            </span>

          </aside>
        </header>

        <section className={styles.body}>

          <div className={styles.body__content}>

            <span className={styles.category}>
              {quiz.category}
            </span>

            <span className={styles.questions_number}>
              {quiz.nbOfQuestions} {quiz.nbOfQuestions === 1 ? 'question' : 'questions'}
            </span>

          </div>

          {quiz.rate === null ? '' :
            <span className={styles.rate}>
              
              <Stars
                rate={quiz.rate}
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
            title={`Voir tous les quizz de ${quiz.creator}`}
            aria-label={`Voir tous les quizz de ${quiz.creator}`}
            onClick={() => router.push(`/profile/${quiz.creator}`)}
          >
            {quiz.creator}
          </button>
        </p>

        <p className={styles.date}>
          {quiz.date}
        </p>
      </footer>
      
    </article>
  );
};

export default QuizCard;