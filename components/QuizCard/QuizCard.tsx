import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from './QuizCard.module.scss';
import defaultImage from '../../public/icons/defaultImage.svg';

type QuizCardProps = {
  id: number,
  creator: string,
  title: string,
  difficulty: string,
  image: string,
  category: string,
  date: string;
  rate: number;
};

const QuizCard = ({
  id,
  creator,
  title,
  difficulty,
  image,
  category,
  date,
  rate
} :QuizCardProps) => {

  const router = useRouter();

  const [backgroundColor, setBackgroundColor] = useState<string>('var(--yellow)');
  
  rate = 4;

  useEffect(() => {
    switch (true) {
      case difficulty === 'Très facile' :
        setBackgroundColor('var(--white)');
        break;
      case difficulty === 'Facile' :
        setBackgroundColor('var(--green)');
        break;
      case difficulty === 'Normal' :
        setBackgroundColor('var(--yellow)');
        break;
      case difficulty === 'Difficile' :
        setBackgroundColor('var(--orange)');
        break;
      case difficulty === 'Très difficile' :
        setBackgroundColor('var(--red)');
        break;
        
      default:
        setBackgroundColor('var(--yellow)');
        break;
    };
  }, []);

  return (
    <article className={styles.card}>
      <section
        className={styles.container}
        onClick={() => router.push(`/quizz/${title}`)}
      >
        <header className={styles.header}>

          <div className={styles.header__icon}>
            <Image
              src={image === null ? defaultImage : image}
              width='32px'
              height='32px'
              layout="responsive"
              alt='Image du quiz'
            />
          </div>

          <aside className={styles.header__aside}>

            <h2 className={styles.header__aside__title}>
              {title}
            </h2>

            <span
              className={styles.header__aside__difficulty}
              style={{background: `${backgroundColor}`}}
            >
              {difficulty}
            </span>

          </aside>
        </header>

        <div className={styles.body}>

          <span className={styles.body__content}>
            {category}
          </span>

          <span className={styles.body__content}>
            {rate === null ? '' : `${rate}/5`}
          </span>
        </div>

      </section>

      <footer className={styles.footer}>

        <p className={styles.creator}>
          Créé par

          <button
            className={styles.link}

          >
            {creator}
          </button>
        </p>

        <p className={styles.date}>
          {date === null ? '' : date}
        </p>
      </footer>
      
    </article>
  );
};

export default QuizCard;