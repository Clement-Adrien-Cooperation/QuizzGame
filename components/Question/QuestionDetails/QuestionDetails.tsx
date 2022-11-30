import type { FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './QuestionDetails.module.scss';

type Props = {
  answer: string,
  proposals: string[],
  description: string
};

const QuestionDetails: FunctionComponent<Props> = ({
  answer,
  proposals,
  description
}) => {

  return (
    <>
      <section className={styles.answers}>

        <p className={styles.answer}>
          {answer}
        </p>

        <ul className={styles.proposals}>
          {proposals.map((proposal: string) =>
            <li
              className={styles.proposals__item}
              key={uuidv4()}
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