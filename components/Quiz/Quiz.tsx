import Link from 'next/link';
import Image from 'next/image';
import styles from './Quiz.module.scss';
import defaultImage from '../../public/icons/defaultImage.svg';
import { useEffect, useState } from 'react';

type QuizProps = {
  id: number,
  creator: string,
  title: string,
  difficulty: string,
  image: string,
  lang: string,
  questions: string[],
  date: string;
  rate: number;
};

const Quiz = ({
  id,
  creator,
  title,
  difficulty,
  image,
  lang,
  questions,
  date,
  rate
} :QuizProps) => {

  const [difficultyColor, setDifficultyColor] = useState<string>('var(--yellow)');

  const link = `/quizz/${id}`;
  
  rate = 4;

  useEffect(() => {
    switch (true) {
      case difficulty === 'Très facile' :
        setDifficultyColor('var(--white)');
        break;
      case difficulty === 'Facile' :
        setDifficultyColor('var(--green)');
        break;
      case difficulty === 'Normal' :
        setDifficultyColor('var(--yellow)');
        break;
      case difficulty === 'Difficile' :
        setDifficultyColor('var(--orange)');
        break;
      case difficulty === 'Très difficile' :
        setDifficultyColor('var(--red)');
        break;
        
      default:
        setDifficultyColor('var(--yellow)');
        break;
      };
  }, []);

  return (
    <Link href={link}>
      <a className={styles.card}>

        <section className={styles.header}>

          <div className={styles.header__icon}>
            <Image
              src={image === null ? defaultImage : image}
              width='32px'
              height='32px'
              layout="responsive"
              alt='Image du quiz'
            />
          </div>

          <div className={styles.header__aside}>

            <h2 className={styles.header__aside__title}>
              {title}
            </h2>

            <span
              className={styles.header__aside__difficulty}
              style={{background: `${difficultyColor}`}}
            >
              {difficulty}
            </span>

          </div>
        </section>

        <section className={styles.body}>
          <span className={styles.body__content}>
            {/* {questions === undefined ? '' : `${questions?.length} + questions`}*/}
            24 questions
          </span>

          <span className={styles.body__content}>
            Langue : {lang}
          </span>

          <span className={styles.body__content}>
            {rate === null ? '' : `${rate}/5`}
          </span>
        </section>

        <section className={styles.footer}>

          <p className={styles.creator}>
            {creator === null ? '' : `Créé par ${creator}`}
          </p>

          <p className={styles.date}>
            {date === null ? '' : date}
          </p>
        </section>
        
      </a>
    </Link>
  );
};

export default Quiz;