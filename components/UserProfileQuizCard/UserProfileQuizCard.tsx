import { useRouter } from 'next/router';
import styles from './UserProfileQuizCard.module.scss';

type UserProfileQuizCardProps = {
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  date: string,
  rate: number
};

const UserProfileQuizCard = ({
  title,
  category,
  difficulty,
  lang,
  image,
  date,
  rate
}: UserProfileQuizCardProps) => {

  const router = useRouter();

  return (
    <article
      className={styles.card}
      onClick={() => {
        router.push(`/quizz/${title}`)
      }}
    >
      <header className={styles.header}>
        <h2 className={styles.header}>
          {title}
        </h2>
      </header>

      <section className={styles.body}>
        <p className={styles.content}>
          {category}
        </p>

        <p className={styles.content}>
          {rate}
        </p>
      </section>

      <footer className={styles.footer}>
      </footer>
    </article>
  );
};

export default UserProfileQuizCard;