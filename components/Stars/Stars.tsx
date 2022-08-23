import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './Stars.module.scss';

type StarsProps = {
  rate: number
};

const Stars = ({
  rate
}: StarsProps) => {

  const filledStars: string[] = [];
  const emptyStars: string[] = [];

  for(let i = 0; i < rate; i++) {
    filledStars.push('+1');
  };

  for(let j = 0; j < 5-rate; j++) {
    emptyStars.push('+1');
  };
  
  return (
    <span
      className={styles.stars}
      title={`Ce quiz a été noté ${rate}/5 par les utilisateurs`}
      aria-label={`Ce quiz a été noté ${rate}/5 par les utilisateurs`}
    >
      {
        filledStars?.map(star => (

          <em
            className={styles.star}
            key={uuidv4()}
          >
            &#9733;
          </em>
        ))
      }

      {
        emptyStars?.map(star => (

          <em
            className={styles.star}
            key={uuidv4()}
          >
            &#9734;
          </em>
        ))
      }

    </span>
  );
};

export default Stars;