import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Stars.module.scss';

type Props = {
  rate: number[]
};

const Stars: FunctionComponent<Props> = ({
  rate
}) => {

  const [filled, setFilled] = useState<string[]>([]);
  const [empty, setEmpty] = useState<string[]>([]);
  const [quizRate, setQuizRate] = useState<number>(0);

  useEffect(() => {

    const filledStars: string[] = [];
    const emptyStars: string[] = [];

    let sum = 0;

    for(let i = 0; i < rate.length; i++) {
      sum += rate[i];
    };

    const rating = Math.floor(sum / rate.length);
    const average = Math.floor((sum / rate.length) * 10) / 10;
    setQuizRate(average);

    for(let j = 0; j < rating; j++) {
      filledStars.push('+1');
    };

    for(let k = 0; k < 5 - rating; k++) {
      emptyStars.push('+1');
    };

    setEmpty(emptyStars);
    setFilled(filledStars);
  }, []);

  return (
    <span
      className={styles.stars}
      title={`Ce quiz a été noté ${quizRate}/5 par ${rate.length} ${rate.length < 2 ? "utilisateur" : "utilisateurs"}`}
      aria-label={`Ce quiz a été noté ${quizRate}/5 par ${rate.length} ${rate.length < 2 ? "utilisateur" : "utilisateurs"}`}
    >
      {filled?.map(star =>
        <em
          className={styles.star}
          key={uuidv4()}
        >
          &#9733;
        </em>
      )}

      {empty?.map(star => 
        <em
          className={styles.star}
          key={uuidv4()}
        >
          &#9734;
        </em>
      )}
    </span>
  );
};

export default Stars;