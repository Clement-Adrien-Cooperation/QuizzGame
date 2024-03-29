import { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { useRouter } from 'next/router';
import styles from './QuizCard.module.scss';
import Stars from '../Stars/Stars';

type Props = {
  quiz: Quiz
};

const QuizCard: FunctionComponent<Props> = ({
  quiz
}) => {

  const router = useRouter();

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
              style={{background: `var(--${quiz.color})`}}
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

          {quiz.rate.length !== 0 &&
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