import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';
import QuizCard from '../../components/QuizCard/QuizCard';
import InputField from '../../components/InputField/InputField';

type QuizProps = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: boolean,
  date: string,
  rate: number
};

const Quizz: NextPage = ({ quizzData, isLogged }: any) => {

  const [filter, setFilter] = useState<string>('');

  useEffect(() => {

    console.log(quizzData);
    
    
    document.title = "Quizz - s'Quizz Game";

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
            inputID={'filterQuizz'}
            type={'text'}
            isDisabled={false}
            handleFunction={handleChangeFilter}
          />
        </div>

        {isLogged && (
          <button className={styles.button}>
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
          {quizzData.map((quiz: QuizProps) => {

            const quizTitle = quiz.title.toLowerCase();
            const quizCreator = quiz.creator.toLowerCase();
            const userFilter = filter.toLowerCase();
            
            // If quiz doesn't have question, we don't render it
            // if(quiz.questions.length !== 0) {
              if(quizTitle.includes(userFilter) || quizCreator.includes(userFilter)) {

                return (
                  <li key={quiz.id}>
                    <QuizCard
                      id={quiz.id}
                      creator={quiz.creator}
                      title={quiz.title}
                      difficulty={quiz.difficulty}
                      image={quiz.image}
                      lang={quiz.lang}
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