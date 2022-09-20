import { FunctionComponent } from 'react';
import Link from 'next/link';
import styles from './GameOver.module.scss';
import { Quiz } from '@prisma/client';
import GameRate from '../GameRate/GameRate';

type Props = {
  score: number,
  isLogged: boolean,
  quiz: Quiz
};

const GameOver: FunctionComponent<Props> = ({
  score,
  isLogged,
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

      {isLogged &&
        <GameRate
          quiz={quiz}
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