import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './Message.module.scss';

type Props = {
  message: string,
  setMessage: Dispatch<SetStateAction<string>>
};

const Message: FunctionComponent<Props> = ({
  message,
  setMessage
}) => {

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    setOpened(true);

    const timeoutID = setTimeout(() => {
      closeMessage();
    }, 5000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  const closeMessage = () => {
    setOpened(false);

    setTimeout(() => {
      setMessage('');
    }, 300);
  };

  return (
    <section
      className={opened ?
        `${styles.card} ${styles.opened}`
      :
        `${styles.card}`
      }
    >
      <header className={styles.header}>
        <CloseButton
          handleFunction={closeMessage}
        />
      </header>

      <div className={styles.body}>

        <p className={styles.text}>
          {message}
        </p>

      </div>
    </section>
  );
};

export default Message;