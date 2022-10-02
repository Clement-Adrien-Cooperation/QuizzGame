import type { FunctionComponent } from 'react'
import type { Played } from '@prisma/client';
import { useEffect, useState } from 'react'
import styles from './PlayedQuizz.module.scss';

type Props = {
  playedData: Played[]
};

const PlayedQuizz: FunctionComponent<Props> = ({
  playedData
}) => {

  const [averageScore, setAverageScore] = useState<number>(0);

  useEffect(() => {
    if(playedData.length > 0) {
      getAverageScore();
    };
  }, []);

  const getAverageScore = () => {
    // init score
    let score = 0;

    // add every score of quizz played
    for(let i = 0; i < playedData.length; i++) {
      score = score + playedData[i].score;
    };

    // divide by number of quizz played
    score = score / playedData.length;

    // round thir number & update state
    setAverageScore(Math.round(score));
  };

  return (
    <ul className={styles.list}>

      <li className={styles.card}>
        Quizz joués :

        <span className={styles.span}>
          {playedData.length}
        </span>
      </li>

      <li className={styles.card}>
        Score moyen :

        <span className={styles.span}>
          {averageScore}/10
        </span>
      </li>

    </ul>
  );
};

export default PlayedQuizz;