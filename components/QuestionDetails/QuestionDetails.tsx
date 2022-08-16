import styles from './QuestionDetails.module.scss';

type QuestionDetailsProps = {
  answer: string,
  propositions: string[],
  description: string
};

const QuestionDetails = ({
  answer,
  propositions,
  description
}: QuestionDetailsProps) => {

  return (
    <>
      <section className={styles.answers}>

        <p className={styles.answer}>
          {answer}
        </p>

        <ul className={styles.propositions}>
          {propositions.map((proposition, index) =>
            <li
              className={styles.propositions__item}
              key={index}
            >
              {proposition}
            </li>  
          )}
        </ul>
      </section>

      {description && (
        <footer>
          <p className={styles.description}>
            {description}
          </p>
        </footer>
      )}
    </>
  );
};

export default QuestionDetails;