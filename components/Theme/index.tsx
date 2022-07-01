import ColorsPicker from "../ColorsPicker";
import DarkMode from "../DarkMode";
import styles from './Theme.module.scss';

const Theme = () => {

  return (
    <section className={styles.container}>
      <ColorsPicker/>
      <DarkMode />
    </section>
  );
};

export default Theme;