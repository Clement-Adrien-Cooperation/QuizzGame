import type { Dispatch, SetStateAction } from 'react';
import type { NextPage } from 'next';
import { useEffect } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import styles from '../styles/Contact.module.scss';

type Props = {
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Contact: NextPage<Props> = ({
  setPageTitle
}) => {

  useEffect(() => {
    setPageTitle("Contact - s'Quizz Game");
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