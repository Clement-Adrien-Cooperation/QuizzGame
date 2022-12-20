import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import Link from 'next/link';
import styles from './GameDetails.module.scss';
import Stars from '../../Stars/Stars';

type Props = {
  quiz: Quiz
};

const GameDetails: FunctionComponent<Props> = ({
  quiz
}) => {

  return (
    <section className={styles.infos}>
      <p>
        Créé par

        <Link href={`/profile/${quiz.creator}`}>
          <a 
            className={styles.link}
            title={`Visiter le profil de ${quiz.creator}`}
          >
            <strong>{quiz.creator}</strong>
          </a>
        </Link>
      </p>

      <p>
        Le {quiz.date}
      </p>

      <p>
        {quiz.nbOfQuestions} questions
      </p>

      <p>
        {quiz.category} ({quiz.difficulty})
      </p>

      {quiz.rate.length !== 0 &&
        <Stars
          rate={quiz.rate}
        />
      }
    </section>
  );
};

export default GameDetails;