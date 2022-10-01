import type { FunctionComponent } from 'react';
import type { Quiz, User } from '@prisma/client';
import Link from 'next/link';
import styles from './GameOver.module.scss';
import GameRate from '../GameRate/GameRate';
import Stars from '../../Stars/Stars';

type Props = {
  score: number,
  isLogged: boolean,
  userLogged: User,
  quiz: Quiz
};

const GameOver: FunctionComponent<Props> = ({
  score,
  isLogged,
  userLogged,
  quiz
}) => {

  return (
    <section className={styles.endgame}>
      <header className={styles.header}>
        <h2 className={styles.title}>
          La partie est terminée
        </h2>
      </header>

      <p className={styles.text}>
        Votre score est de 

        <span className={styles.score}>
          {score}
        </span>/10
      </p>

      {isLogged ?
        <>
          {quiz.rates_IDs.includes(userLogged.id) || userLogged.id === quiz.user_id ?
            <Stars
              rate={quiz.rate}
            />
          :
            <GameRate
              quiz={quiz}
              userLogged={userLogged}
            />
          }
        </>
      :
        <Stars
          rate={quiz.rate}
        />
      }

      <Link href='/'>
        <a
          className={styles.link}
          aria-label="Revenir à la page d'accueil"
          title="Revenir à la page d'accueil"
        >
          Accueil
        </a>
      </Link>
    </section>
  );
};

export default GameOver;