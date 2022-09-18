import { FunctionComponent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Stars.module.scss';

type Props = {
  rate: number
};

const Stars: FunctionComponent<Props> = ({
  rate
}) => {

  const filledStars: string[] = [];
  const emptyStars: string[] = [];

  useEffect(() => {
    for(let i = 0; i < rate; i++) {
      filledStars.push('+1');
    };

    for(let j = 0; j < 5 - rate; j++) {
      emptyStars.push('+1');
    };
  }, []);
  
  return (
    <section
      className={styles.stars}
      title={`Ce quiz a été noté ${rate}/5 par les utilisateurs`}
      aria-label={`Ce quiz a été noté ${rate}/5 par les utilisateurs`}
    >
      {filledStars?.map(star => (
        <span
          className={styles.star}
          key={uuidv4()}
        >
          &#9733;
        </span>
      ))}

      {emptyStars?.map(star => (
        <span
          className={styles.star}
          key={uuidv4()}
        >
          &#9734;
        </span>
      ))}
    </section>
  );
};

export default Stars;