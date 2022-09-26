import type { FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './GameProposals.module.scss';

type Props = {
  currentProposals: string[]
  handleUserAnswer: (proposal: string) => void
};

const GameProposals: FunctionComponent<Props> = ({
  currentProposals,
  handleUserAnswer
}) => {

  return (
    <ul className={styles.list}>
      {currentProposals?.map(proposal =>
        <li
          className={styles.proposal}
          key={uuidv4()}
        >
          <button
            className={styles.button}
            type="button"
            aria-label={`Répondre "${proposal}"`}
            title={`Répondre "${proposal}"`}
            onClick={() => handleUserAnswer(proposal)}
          >
            {proposal}
          </button>
        </li>
      )}
    </ul>
  );
};

export default GameProposals;