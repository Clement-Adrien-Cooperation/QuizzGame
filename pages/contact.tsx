import { NextPage } from 'next';
import ContactForm from '../components/ContactForm/ContactForm';
import styles from '../styles/Contact.module.scss';

const Contact: NextPage = () => {

  return (
    <>
      <h1 className={styles.title}>
        Contact
      </h1>

      <ContactForm />
    </>
  );
};

export default Contact;