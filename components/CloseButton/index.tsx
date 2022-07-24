import styles from './CloseButton.module.scss';

type CloseButtonProps = {
  handleFunction: Function
};

const CloseButton = ({ handleFunction } :CloseButtonProps) => {

  return (
    <button
      className={styles.close_button}
      onClick={() => handleFunction(false)}
    >
      &times;
    </button>
  );
};

export default CloseButton;