import { useState } from 'react';
import styles from './SignIn.module.scss';

import InputField from '../InputField';

const SignIn = ({handleToggleForm }: {
  handleToggleForm: Function
}) => {

  // const [pseudoOrEmail, setPseudoOrEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { pseudo, password }

    // console.log(pseudoOrEmail);
  
    await fetch(`/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();
      console.log(data);
      
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // const handleChangePseudoOrEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPseudoOrEmail(e.target.value);
  // };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudo(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <section className={styles.container}>

      <h2 className={styles.container__title}>
        Se connecter
      </h2>

      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <InputField
          name={'Pseudo'}
          state={pseudo}
          inputID={'pseudo'}
          type={'text'}
          handleFunction={handleChangePseudo}
        />

        {/* <InputField
          name={'adresse mail'}
          state={email}
          inputID={'email'}
          type={'text'}
          handleFunction={handleChangeEmail}
        /> */}

        <InputField
          name={'Mot de passe'}
          state={password}
          inputID={'password'}
          type={'password'}
          handleFunction={handleChangePassword}
        />

        <p className={styles.warning}>
          {warningMessage}
        </p>
        
        <button
          className={styles.submit_button}
          type='submit'
        >
          Connexion
        </button>

      </form>

      <button
        className={styles.secondary_button}
        onClick={() => handleToggleForm()}
      >
        Se créer un compte
      </button>

    </section>
  );
};

export default SignIn;