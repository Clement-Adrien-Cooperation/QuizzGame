import type { FunctionComponent } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './ContactForm.module.scss';
import IconSend from '../Icons/IconSend';

const ContactForm: FunctionComponent = () => {

  const [state, handleSubmit] = useForm('mknkynke');

  if (state.succeeded) {
    return (
      <section className={styles.success}>
        <p className={styles.success__message}>
          Message envoyé !
        </p>
      </section>
    );
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      <input
        className={styles.input}
        id='email'
        type='email'
        name='email'
        autoFocus
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
        title='Envoyer le message'
        aria-label='Envoyer le message'
        disabled={state.submitting}
      >
        <div className={styles.icon}>
          <IconSend color={"var(--white)"} />
        </div>

        <span className={styles.span}>
          Envoyer
        </span>
      </button>
    </form>
  );
};

export default ContactForm;