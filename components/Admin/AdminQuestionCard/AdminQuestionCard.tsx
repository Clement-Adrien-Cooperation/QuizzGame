import type { FunctionComponent } from 'react';
import type { Question } from '@prisma/client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import styles from './AdminQuestionCard.module.scss';
import arrow from '../../../public/icons/arrow.svg';

type Props = {
  question: Question
};

const AdminQuestionCard: FunctionComponent<Props> = ({
  question
}) => {

  const [showDetails, setShowDetails] = useState<boolean>(false);

  return (
    <>
      <article
        className={styles.card}
        title="Cliquer pour voir/cacher les détails"
        aria-label="Cliquer pour voir/cacher les détails"
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
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt={'Une flèche'}
              src={arrow}
            />
          </div>
        </footer>

      </article>
    </>
  );
};

export default AdminQuestionCard;