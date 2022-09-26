import type { NextPage } from 'next';
import { useEffect } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import styles from '../styles/Contact.module.scss';

const Contact: NextPage = () => {

  useEffect(() => {

    document.title = "Contact - s'Quizz Game";

  }, []);

  return (
    <>
      <h1 className={styles.title}>
        Contact
      </h1>

      <section className={styles.container}>

        <ContactForm />

      </section>
    </>
  );
};

export default Contact;