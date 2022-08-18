import styles from './CloseButton.module.scss';

type CloseButtonProps = {
  handleFunction: Function
};

const CloseButton = ({ handleFunction } :CloseButtonProps) => {

  return (
    <button
      className={styles.close_button}
      type='button'
      title='Fermer'
      aria-label='Fermer'
      onClick={() => handleFunction()}
    >
      &times;
    </button>
  );
};

export default CloseButton;