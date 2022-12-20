import type { FunctionComponent } from 'react';
import type { Question } from '@prisma/client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AdminQuestionCard.module.scss';
import IconArrow from '../../../public/Icons/IconArrow';

type Props = {
  question: Question
};

const AdminQuestionCard: FunctionComponent<Props> = ({
  question
}) => {

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <article
      className={styles.card}
      title={showDetails ? "Cliquer pour cacher les détails" : "Cliquer pour voir les détails"}
      aria-label={showDetails ? "Cliquer pour cacher les détails" : "Cliquer pour voir les détails"}
      onClick={() => setShowDetails(!showDetails)}
    >
      <header className={styles.header}>
        <h5 className={styles.title}>
          {question.question}
        </h5>
      </header>

      <div
        className={showDetails ?
          `${styles.body} ${styles.opened}`
        :
          `${styles.body}`
        }
      >
        <p className={styles.answer}>
          {question.answer}
        </p>

        <ul className={styles.proposals}>

          {question.proposals.map(proposal =>
            <li key={uuidv4()}>
              <p className={styles.proposal}>
                {proposal}
              </p>
            </li>
          )}
        </ul>

        {question.description &&
          <p className={styles.description}>
            {question.description}
          </p>
        }
      </div>

      <footer className={styles.footer}>
        <div
          className={showDetails ?
            `${styles.arrow} ${styles.rotated}`
          : 
            `${styles.arrow}`
          }
        >
          <IconArrow />
        </div>
      </footer>
    </article>
  );
};

export default AdminQuestionCard;