import type { FunctionComponent } from 'react';
import type { Quiz, User } from '@prisma/client';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { FaStar } from 'react-icons/fa';
import { api } from '../../../api/api';
import styles from './GameRate.module.scss';

type Props = {
  quiz: Quiz,
  userLogged: User
}

const GameRate: FunctionComponent<Props> = ({
  quiz,
  userLogged
}) => {

  // Create a new array 5 of length and fill it with 0
  const stars = Array(5).fill(0);

  const [hover, setHover] = useState(0);
  const [rated, setRated] = useState<boolean>(false);

  const handleRateQuiz = async(rate: number) => {
    // Push new rate & user ID with previous on new arrays
    const newRate: number[] = [...quiz.rate, rate];
    const newRates_IDs: string[] = [...quiz.rates_IDs, userLogged.id];

    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // Set body with required data
    const body = {
      quiz_id: quiz.id,
      rate: newRate,
      rates_IDs: newRates_IDs,
      user_id: userLogged.id
    };

    // update rate
    await fetch(`${api}/quiz/rate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        console.log('ok');
      } else {
        console.log('error');
      };
    })
    .catch((error) => {
      console.log(error);
    });

    // Update state
    setRated(true);
  };

  return (
    <>
      {rated ?
        <section className={styles.rate}>
          <p className={styles.text}>
            Vous avez donné une note de {hover}/5 à ce quiz
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