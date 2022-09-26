import type { NextPage } from 'next';
import ContactForm from '../components/ContactForm/ContactForm';
import styles from '../styles/Banned.module.scss';

const Banned: NextPage = () => {

  return (
    <>
      <div className={styles.container}>

        <h1 className={styles.title}>
          Vous avez été banni
        </h1>

        <p className={styles.message}>
          Si vous pensez que c'est une erreur, vous pouvez nous envoyer un message ci-dessous
        </p>

        <ContactForm />
      </div>
    </>
  );
};

export default Banned;