import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import styles from './Warning.module.scss';

type Props = {
  warningMessage: string,
  setWarningMessage: Dispatch<SetStateAction<string>>
};

const Warning: FunctionComponent<Props> = ({
  warningMessage,
  setWarningMessage
}) => {

  return (
    <div className={styles.warning}>

      <p className={styles.warning__message}>
        {warningMessage}
      </p>

      <button
        className={styles.warning__button}
        type='button'
        title='Fermer'
        aria-label='Fermer'
        onClick={() => setWarningMessage('')}
      >
        &times;
      </button>
      
    </div>
  );
};

export default Warning;