import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './UserQuizCard.module.scss';
import playIcon from '../../public/icons/play.svg';
import editIcon from '../../public/icons/edit.svg';
import deleteIcon from '../../public/icons/delete.svg';

type UserQuizCardProps = {
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
  reportMessage?: string,
  getQuizzFromUser: Function
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
  reportMessage,
  getQuizzFromUser
}: UserQuizCardProps) => {

  const router = useRouter();

  const handleDeleteQuiz = async (id: number) => {

    await fetch('api/quizz/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(async(res) => {
      const data = await res.json();
      console.log(data);
      
      await getQuizzFromUser();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <section className={styles.card} key={id}>
      <header className={styles.header}>
        <h3 className={styles.title}>
          {title}
        </h3>
      
        <span className={styles.category}>
          {category}
        </span>
      </header>

      <footer className={styles.footer}>
        <button
          className={styles.button}
          onClick={() => router.push(`/quizz/${title}`)}
        >
          <div className={styles.icon}>
            <Image
              src={playIcon}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Jouer'
            />
          </div>
        </button>
        <button
          className={styles.button}
          onClick={() => router.push(`/quizz/update/${title}`)}
        >
          <div className={styles.icon}>
            <Image
              src={editIcon}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Modifier'
            />
          </div>
        </button>
        <button
          className={styles.button}
          onClick={() => handleDeleteQuiz(id)}
        >
          <div className={styles.icon}>
            <Image
              src={deleteIcon}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Supprimer'
            />
          </div>
        </button>
      </footer>
    </section>
  );
};

export default UserQuizCard;