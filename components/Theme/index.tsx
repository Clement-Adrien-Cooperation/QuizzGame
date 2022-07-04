import ColorsPicker from "../ColorsPicker";
import DarkMode from "../DarkMode";
import styles from './Theme.module.scss';

const Theme = () => {

  return (
    <div className={styles.params}>
      <section className={styles.container}>
        <ColorsPicker/>
        <DarkMode />
      </section>
    </div>
  );
};

export default Theme;