import { Quiz, User } from '@prisma/client';
import { NextPage } from 'next';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import { api } from '../../api/api';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';
import QuizCard from '../../components/QuizCard/QuizCard';
import InputField from '../../components/InputField/InputField';

type Props = {
  quizzData: any,
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Quizz: NextPage<Props> = ({
  quizzData,
  isLogged,
  userLogged,
  setShowLoader
}) => {

  const router = useRouter();

  const [filter, setFilter] = useState<string>('');
  const [quizz, setQuizz] = useState<Quiz[]>([]);
  
  useEffect(() => {

    document.title = "Quizz - s'Quizz Game";

    setQuizz(quizzData);
    setShowLoader(false);

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    } else {
      router.push('/');
    };
  }, []);

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };
  
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
            type={'text'}
            isDisabled={false}
            required={true}
            autoFocus={true}
            handleFunction={handleChangeFilter}
          />
        </div>

        {isLogged && (
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
        )}
      </header>

      <section className={styles.container}>

        <ul>
          {quizz?.map((quiz: Quiz) => {

            const quizTitle = quiz.title.toLowerCase();
            const quizCreator = quiz.creator.toLowerCase();
            const userFilter = filter.toLowerCase();
            
            // If quiz doesn't have question, we don't render it
            if(quizTitle.includes(userFilter) && quiz.nbOfQuestions > 0
            || quizCreator.includes(userFilter) && quiz.nbOfQuestions > 0) {

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
    },
    revalidate: 10
  };
};