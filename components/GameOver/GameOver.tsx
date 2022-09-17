import { FunctionComponent } from 'react';
import styles from './GameOver.module.scss';

type Props = {
  score: number
};

const GameOver: FunctionComponent<Props> = ({
  score
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
    </section>
  );
};

export default GameOver;