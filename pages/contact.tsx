import { useForm, ValidationError } from '@formspree/react';
import { NextPage } from 'next';
import Image from 'next/image';
import styles from '../styles/Contact.module.scss';
import send from '../public/icons/send.svg';

const Contact: NextPage = () => {
  
  const [state, handleSubmit] = useForm('mknkynke');

  if (state.succeeded) {
    return (
      <>
        <h1 className={styles.title}>
          Contact
        </h1>
        
        <section className={styles.success}>
          <p className={styles.success__message}>
            Message envoyé !
          </p>
        </section>
      </>
    );
  };

  return (
    <>
      <h1 className={styles.title}>
        Contact
      </h1>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          className={styles.input}
          id='email'
          type='email'
          name='email'
          placeholder='Votre adresse mail'
        />
        <ValidationError
          prefix='Email'
          field='email'
          errors={state.errors}
        />

        <textarea
          className={styles.area}
          id='message'
          name='message'
          placeholder='Envoyez nous un message'
        />
        <ValidationError
          prefix='Message'
          field='message'
          errors={state.errors}
        />

        <button
          className={styles.button}
          type='submit'
          disabled={state.submitting}
        >
          <div className={styles.icon}>
            <Image
              src={send}
              width='32px'
              height='32px'
              layout='responsive'
              alt='Envoyer le message'
            />
          </div>
          <span className={styles.span}>
            Envoyer
          </span>
        </button>
      </form>
    </>
  );
};

export default Contact;