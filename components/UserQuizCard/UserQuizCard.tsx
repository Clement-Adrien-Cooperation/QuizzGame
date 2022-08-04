import { useRouter } from 'next/router';
import styles from './UserQuizCard.module.scss';

type UserQuizCardTypes = {
  id: number,
  user_id?: number,
  creator?: string,
  title: string,
  category: string,
  lang: string,
  difficulty: string,
  is_visible: boolean,
  date: string,
  reported?: boolean,
  reportMessage?: string
};

const UserQuizCard = ({
  id,
  title,
  category,
  lang,
  difficulty,
  is_visible,
  date,
  reported,
  reportMessage
}: UserQuizCardTypes) => {

  const router = useRouter();

  return (
    <section className={styles.card} key={id}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          {title}
        </h3>
      </header>

      <footer className={styles.footer}>
        <button>
          Jouer
        </button>
        <button
          className={styles.button}
          onClick={() => router.push(`/quizz/update/${title}`)}
        >
          Modifier
        </button>
        <button>
          Supprimer
        </button>
      </footer>
    </section>
  );
};

export default UserQuizCard;