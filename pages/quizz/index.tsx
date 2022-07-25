import { NextPage } from 'next';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';
import Quiz from '../../components/Quiz/Quiz';
import { useState } from 'react';
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
  rate: number,
  questions: string[],
  comments: string[]
};

const Quizz: NextPage = ({ quizzData }:any) => {

  const [filter, setFilter] = useState<string>('');

  const handleChangeFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  
  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Quizz
        </h2>

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

        <button className={styles.button}>
          <Link href='/quizz/create'>
            <a className={styles.link}>
              Créer un Quiz
            </a>
          </Link>
        </button>

      </header>

      <section className={styles.container}>

        <ul>
          {quizzData.map((quiz: QuizProps) => {

            const quizTitle = quiz.title.toLowerCase();
            const quizCreator = quiz.creator.toLowerCase();
            const userFilter = filter.toLowerCase();
            
            // If quiz doesn't have question, we don't show it
            // if(quiz.questions !== undefined) {
              if(quizTitle.includes(userFilter) || quizCreator.includes(userFilter)) {

                return (
                  <li key={quiz.id}>
                    <Quiz
                      creator={quiz.creator}
                      title={quiz.title}
                      difficulty={quiz.difficulty}
                      image={quiz.image}
                      lang={quiz.lang}
                      questions={quiz.questions}
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