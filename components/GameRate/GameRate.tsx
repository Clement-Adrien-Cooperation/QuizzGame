import { Quiz } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { FaStar } from 'react-icons/fa';
import styles from './GameRate.module.scss';

type Props = {
  quiz: Quiz
}

const GameRate: FunctionComponent<Props> = ({
  quiz
}) => {

  const stars = Array(5).fill(0);

  const [hover, setHover] = useState(0);
  const [rated, setRated] = useState<boolean>(false);

  const handleRateQuiz = (rate: number) => {
    const previousRate = quiz.rate;
    let newRate: number;

    if(previousRate === 0) {
      newRate = rate;
    } else {



    };
  };

  return (
    <>
      {rated ?
        <section className={styles.rate}>
          <p className={styles.text}>
            Merci pour votre note !
          </p>
        </section>
      :
        <section className={styles.rate}>
          <header>
            <h3 className={styles.title}>
              Vous pouvez donner une note à ce quiz
            </h3>
          </header>

          <ul className={styles.stars}>
          {stars.map((star, index) => {

            const value = index + 1;

            return (
              <li
                key={uuidv4()}
                title={`Donner une note de ${value}/5 à ce quiz`}
                aria-label={`Donner une note de ${value}/5 à ce quiz`}
              >
                <FaStar
                  className={styles.star}
                  color={value <= hover ? "#ffc107" : "var(--input-color)"}
                  onMouseEnter={() => setHover(value)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => handleRateQuiz(value)}
                />
              </li>
            );
          })}
          </ul>
        </section>
      }
    </>
  );
};

export default GameRate;