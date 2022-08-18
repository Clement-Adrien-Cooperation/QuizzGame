import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';
import QuizCard from '../../components/QuizCard/QuizCard';
import InputField from '../../components/InputField/InputField';
import Loader from '../../components/Loader/Loader';

type QuizTypes = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  nbOfQuestions: number,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: boolean,
  date: string,
  rate: number
};

const Quizz: NextPage = ({ quizzData, isLogged, userLogged }: any) => {

  const router = useRouter();

  const [filter, setFilter] = useState<string>('');
  const [quizz, setQuizz] = useState<QuizTypes[]>([]);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {

    if(userLogged.is_banished === true) {
      router.push('/banned');
    } else {
      document.title = "Quizz - s'Quizz Game";

      setQuizz(quizzData);
      setShowLoader(false);
    };
  }, []);

  const handleChangeFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Quizz
        </h1>

        <div className={styles.input}>
          <InputField
            name={'Rechercher un quiz...'}
            state={filter}
            inputID={'quizz-filter'}
            type={'text'}
            isDisabled={false}
            required={true}
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
          {quizz?.map((quiz: QuizTypes) => {

            const quizTitle = quiz.title.toLowerCase();
            const quizCreator = quiz.creator.toLowerCase();
            const userFilter = filter.toLowerCase();
            
            // If quiz doesn't have question, we don't render it
            // if(quiz.nbOfQuestions !== 0) {
              if(quizTitle.includes(userFilter) || quizCreator.includes(userFilter)) {

                return (
                  <li key={quiz.id}>
                    <QuizCard
                      id={quiz.id}
                      creator={quiz.creator}
                      title={quiz.title}
                      nbOfQuestions={quiz.nbOfQuestions}
                      difficulty={quiz.difficulty}
                      image={quiz.image}
                      category={quiz.category}
                      date={quiz.date}
                      rate={quiz.rate}
                    />
                  </li>
                );
              };
            // };
          })}
        </ul>
      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default Quizz;

export async function getStaticProps() {

  // Get data from API
  const quizzDataFromAPI = await fetch('http://localhost:3000/api/quizz/getAll');

  // Translate to JSON
  const quizzData = await quizzDataFromAPI.json();

  // We return data & using it in the state
  return {
    props: {
      quizzData
    }
  };
};