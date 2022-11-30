import type { FunctionComponent } from 'react';
import styles from './CloseButton.module.scss';

type Props = {
  handleFunction: () => void
};

const CloseButton: FunctionComponent<Props> = ({
  handleFunction
}) => {

  return (
    <button
      className={styles.close_button}
      type='button'
      title='Fermer'
      aria-label='Fermer'
      onClick={handleFunction}
    >
      &times;
    </button>
  );
};

export default CloseButton;