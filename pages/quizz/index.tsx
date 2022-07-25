import { NextPage } from 'next';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';
import Quiz from '../../components/Quiz/Quiz';

type QuizProps = {
  id: number,
  user_id: number,
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

  console.log(quizzData);
  
  return (
    <>
      <h2 className={styles.title}>
        Quizz
      </h2>

      <section className={styles.container}>

        <ul>
          {quizzData.map((quiz: any, index :number) =>
            <li key={quiz.id}>
              <Quiz
                title={quiz.title}
                image={quiz.image}
                questions={quiz.questions}
              />
            </li>
          )}
        </ul>

        <button className={styles.link}>

          <Link href='/quizz/create'>
            <a>
              Créer un s'Quizz
            </a>
          </Link>

        </button>

      </section>
    </>
  );
};

export default Quizz;

export async function getStaticProps() {

  // Get data from API
  const quizzDataFromAPI = await fetch('http://localhost:3000/api/getAllQuizz');

  // Translate to JSON
  const quizzData = await quizzDataFromAPI.json();

  // We return data & using it in the state
  return {
    props: {
      quizzData
    }
  };
};