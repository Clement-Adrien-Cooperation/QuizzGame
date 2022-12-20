import type { FunctionComponent } from 'react';
import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import IconStar from '../Icons/IconStar';
import styles from './Stars.module.scss';

type Props = {
  rate: number[]
};

const Stars: FunctionComponent<Props> = ({
  rate
}) => {

  let sum = 0;

  for(let i = 0; i < rate.length; i++) {
    sum += rate[i];
  };

  const rating = Math.floor(sum / rate.length);

  const filled = useMemo(() => {
    const filledStars: string[] = [];

    for(let j = 0; j < rating; j++) {
      filledStars.push('+1');
    };

    return filledStars;
  }, [rate]);

  const empty = useMemo(() => {
    const emptyStars: string[] = [];

    for(let k = 0; k < 5 - rating; k++) {
      emptyStars.push('+1');
    };

    return emptyStars;
  }, [rate]);

  const average = useMemo(() => {
    return Math.floor((sum / rate.length) * 10) / 10;
  }, [rate]);

  return (
    <span
      className={styles.stars}
      title={`Ce quiz a été noté ${average}/5 par ${rate.length} ${rate.length < 2 ? "utilisateur" : "utilisateurs"}`}
      aria-label={`Ce quiz a été noté ${average}/5 par ${rate.length} ${rate.length < 2 ? "utilisateur" : "utilisateurs"}`}
    >
      {filled?.map(star =>
        <em
          className={styles.star}
          key={uuidv4()}
        >
          <IconStar
            color={"var(--gold)"}
            height={'18'}
          />
        </em>
      )}

      {empty?.map(star =>
        <em
          className={styles.star}
          key={uuidv4()}
        >
          <IconStar
            color={"var(--light-grey)"}
            height={'18'}
          />
        </em>
      )}
    </span>
  );
};

export default Stars;