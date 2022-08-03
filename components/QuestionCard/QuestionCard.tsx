import styles from './QuestionCard.module.scss';

type QuestionCardProps = {
  id: number,
  quizz_id: number,
  question: string,
  answer: string,
  propositions: string[],
  description: string
};

const QuestionCard = ({
  id,
  quizz_id,
  question,
  answer,
  propositions,
  description
}: QuestionCardProps) => {

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h3 className={styles.question}>
          {question}
        </h3>

        <p>
          {answer}
        </p>
      </header>



      <footer>

        <button>
          Éditer
        </button>

        <button>
          Supprimer
        </button>

      </footer>
    </section>
  );
};

export default QuestionCard;