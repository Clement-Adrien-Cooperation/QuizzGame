import type { FunctionComponent, PropsWithChildren, Dispatch, SetStateAction } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import styles from './Modal.module.scss';

type Props = PropsWithChildren<{
  setShowModal: Dispatch<SetStateAction<boolean>>
}>;

const Modal: FunctionComponent<Props> = ({
  setShowModal,
  children
}) => {

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.behind}
        onClick={() => setShowModal(false)}
      >
      </div>

      <section className={styles.container}>
        
        <CloseButton
          handleFunction={() => setShowModal(false)}
        />
      
        {children}
        
      </section>
    </div>
  );
};

export default Modal;