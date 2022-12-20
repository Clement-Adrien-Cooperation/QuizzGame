import type { NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { Quiz, User } from '@prisma/client';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../api/api';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';
import QuizCard from '../../components/QuizCard/QuizCard';
import InputField from '../../components/InputField/InputField';

type Props = {
  quizzData: Quiz[],
  isLogged: boolean,
  userLogged: User,
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Quizz: NextPage<Props> = ({
  quizzData,
  isLogged,
  userLogged,
  setPageTitle
}) => {

  const router = useRouter();

  const [filter, setFilter] = useState<string>('');

  useEffect(() => {

    setPageTitle("Tous les quizz - s'Quizz Game");

    if(isLogged && userLogged.is_banished) {
      router.push('/banned');
    };
  }, []);

  const displayedQuizz = useMemo(() => {
    if(filter) {
      return quizzData.filter((quiz: Quiz) => {
        return quiz.title.toLowerCase().includes(filter.toLowerCase())
        || quiz.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return quizzData;

  }, [filter]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Quizz
        </h1>

        <div
          className={styles.input}
          title="Vous pouvez filtrer les quizz avec le nom d'un quiz ou avec le pseudo de son créateur"
          aria-label="Vous pouvez filtrer les quizz avec le nom d'un quiz, ou avec le pseudo de son créateur"
        >
          <InputField
            name={'Rechercher un quiz...'}
            state={filter}
            inputID={'quizz-filter'}
            type={'search'}
            isDisabled={false}
            required={true}
            autoFocus={true}
            setState={setFilter}
          />
        </div>

        {isLogged &&
          <button
            className={styles.button}
            type='button'
            title='Créer un nouveau quiz'
            aria-label='Créer un nouveau quiz'
          >
            <Link href='/quizz/create'>
              <a className={styles.link}>
                Créer un Quiz
              </a>
            </Link>
          </button>
        }
      </header>

      <section>
        <ul className={styles.container}>
          {displayedQuizz.map((quiz: Quiz) => {
            if(quiz.nbOfQuestions >= 10) {
              return (
                <li key={uuidv4()}>
                  <QuizCard
                    quiz={quiz}
                  />
                </li>
              );
            };
          })}
        </ul>
      </section>
    </>
  );
};

export default Quizz;

export async function getStaticProps() {

  // Get data from API
  const quizzDataFromAPI = await fetch(`${api}/quiz/getAll`);

  // Translate to JSON
  const quizzData = await quizzDataFromAPI.json();

  // We return data & using it in the state
  return {
    props: {
      quizzData
    }
  };
};