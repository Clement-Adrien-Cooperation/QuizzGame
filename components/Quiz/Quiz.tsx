import Link from 'next/link';
import Image from 'next/image';
import styles from './Quiz.module.scss';
import defaultImage from '../../public/icons/defaultImage.svg';

type QuizProps = {
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
  creator,
  title,
  difficulty,
  image,
  lang,
  questions,
  date,
  rate
} :QuizProps) => {
  
  rate = 4;

  return (
    <Link href='/'>
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

            <span className={styles.header__aside__difficulty}>
              {difficulty}
            </span>

          </div>
        </section>

        <section className={styles.body}>
          <span className={styles.body__questions}>
            {/* {questions === undefined ? '' : `${questions?.length} + questions`}*/}
            24 questions
          </span>

          <span className={styles.body__lang}>
            Langue : {lang}
          </span>

          <span className={styles.body__rate}>
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