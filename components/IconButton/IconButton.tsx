import type { FunctionComponent, PropsWithChildren } from 'react';
import styles from './IconButton.module.scss';

type Props = PropsWithChildren<{
  title: string,
  handleFunction: () => void
}>;

const IconButton: FunctionComponent<Props> = ({
  title,
  handleFunction,
  children
}) => {

  return (
    <button
      className={styles.button}
      type="button"
      title={title}
      aria-label={title}
      onClick={handleFunction}
    >
      {children}
    </button>
  );
};

export default IconButton;