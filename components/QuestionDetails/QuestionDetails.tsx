import styles from './QuestionDetails.module.scss';

type QuestionDetailsProps = {
  answer: string,
  proposals: string[],
  description: string
};

const QuestionDetails = ({
  answer,
  proposals,
  description
}: QuestionDetailsProps) => {

  return (
    <>
      <section className={styles.answers}>

        <p className={styles.answer}>
          {answer}
        </p>

        <ul className={styles.proposals}>
          {proposals.map((proposal, index) =>
            <li
              className={styles.proposals__item}
              key={index}
            >
              {proposal}
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