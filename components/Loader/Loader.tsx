import { FunctionComponent } from 'react';
import styles from './Loader.module.scss';

const Loader: FunctionComponent = () => {
  return (
    <div className={styles.container}>
      
      <div className={styles.loader}>
      </div>
    </div>
  );
};

export default Loader;