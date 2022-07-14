import { NextPage } from 'next';
import styles from '../../styles/Quizz.module.scss';
import Link from 'next/link';

const Quizz: NextPage = ({ quizzData }:any) => {

  return (
    <>
      <h2 className={styles.title}>
        Page de tous les quizz ?
      </h2>

      <section className={styles.container}>

        <button className={styles.link}>

          <Link href='/quizz/create'>
            <a>
              Créer
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