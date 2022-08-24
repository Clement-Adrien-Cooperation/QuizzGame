import Image from 'next/image';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './AdminQuestionCard.module.scss';
import arrow from '../../public/icons/arrow.svg';

type QuestionTypes = {
  id: string,
  quizz_id: string,
  question: string,
  description: string,
  proposals: string[],
  answer: string,
  reported?: boolean,
  reportMessage?: string
};

type AdminQuestionCardProps = {
  question: QuestionTypes
};

const AdminQuestionCard = ({
  question
}: AdminQuestionCardProps) => {

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

            {!question.reported ? '' :
              <span
                className={styles.reported}
                title="Cette question a été signalée"
                aria-label="Cette question a été signalée"
              >
                ⚠️
              </span>
            }

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