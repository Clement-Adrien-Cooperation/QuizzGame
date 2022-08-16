import styles from './AdminQuizCard.module.scss';

type QuizTypes = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: string,
  date: string,
  rate: number,
  reported: boolean
};

const AdminQuizCard = ({
  id,
  user_id,
  creator,
  title,
  category,
  difficulty,
  lang,
  image,
  is_visible,
  date,
  rate,
  reported
}: QuizTypes) => {

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.header}>
          {title}
        </h3>
      </header>

    </section>
  );
};

export default AdminQuizCard;