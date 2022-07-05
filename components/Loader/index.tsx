import styles from './Loader.module.scss';
import loader from '../../public/icons/loader.svg';
import Image from 'next/image';

const Loader = () => {
  return (
    <>
      <h2 className={styles.title}>
        Loading
      </h2>
      
      <div className={styles.loader}>
        <Image
          layout="responsive"
          width='32'
          height='32'
          alt='Chargement en cours...'
          src={loader}
        />
      </div>
    </>
  );
};

export default Loader;