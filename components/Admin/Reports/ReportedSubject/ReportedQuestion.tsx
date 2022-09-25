import { Question } from '@prisma/client';
import { FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import styles from './ReportedSubject.module.scss';
import mail from '../../../../public/icons/mail.svg';

type Props = {
  question: Question
};

const ReportedQuestion: FunctionComponent<Props> = ({
  question
}) => {

  const sendMessageToCreator = () => {
    console.log("créer modal pour envoyer un message");
    
  };

  return (
    <>
      <section className={styles.body}>
        <p>
          Bonne réponse :
          <span className={styles.span}>
            {question.answer}
          </span>
        </p>

        <p>
          Propositions :
        </p>

        <ul>
          {question.proposals.map(proposal =>
            <li key={uuidv4()}>
              {proposal}
            </li>
          )}
        </ul>

        {question.description &&
          <p>
            Description / Anecdotes ajoutées par le créateur :
            <br/>
            <br/>
            {question.description}
          </p>
        }
      </section>

      <hr className={styles.hr} />

      <footer className={styles.footer}>
        <button
          className={styles.button}
          type="button"
          title="Envoyer un message au créateur"
          aria-label="Envoyer un message au créateur"
          onClick={sendMessageToCreator}
        > 
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une enveloppe'
            src={mail}
          />
        </button>
      </footer>
    </>
  );
};

export default ReportedQuestion;