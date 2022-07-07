import { useState } from 'react';
import styles from './SignUp.module.scss';

import InputField from '../InputField';

const SignUp = () => {

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [confirmPassword, setConfirmPassword]= useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the refresh
    e.preventDefault();

    // Reset the warning message
    setWarningMessage('');

    // If there is nothing in one of the fields
    if(pseudo === '' || email === '' || password === '' || confirmPassword === '') {

      // We warn user
      setWarningMessage('Veuillez remplir tous les champs');

    // If email is not valid
    } else if (!email.includes('@') && !email.includes('.')) {

      // We warn him too
      setWarningMessage('Veuillez entrer un email valide');

    // If the two passwords are not the same
    } else if (password !== confirmPassword) {

      // Same routine..
      setWarningMessage('Les deux mots de passe ne correspondent pas');
    
    } else if (password.length < 10 || password.length > 1000) {

      setWarningMessage('Votre mot de passe doit contenir entre 10 et 1000 caractères');

    } else {

      // If everything is ok, set up the body
      const body = { pseudo, email, password };

      // & create a new user
      await fetch(`/api/createOneUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      setPseudo('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    };
  };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {

    // If pseudo is longer than 30 letters
    if(pseudo.length > 30) {
      // We warn user
      setWarningMessage('Votre pseudo ne doit pas excéder 30 caractères');
    } else {
      // If not, we update state
      setPseudo(e.target.value);
    };
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(email.length > 100) {
      setWarningMessage('Votre adresse mail ne doit pas excéder 100 caractères');
    } else {
      setEmail(e.target.value);
    };
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(password.length > 100) {
      setWarningMessage('Votre mot de passe ne doit pas excéder 100 caractères');
    } else {
      setPassword(e.target.value);
    };
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(confirmPassword.length > 100) {
      setWarningMessage('Votre mot de passe ne doit pas excéder 100 caractères');
    } else {
      setConfirmPassword(e.target.value);
    };
  };
  
  return (
    <section className={styles.container}>

      <h2 className={styles.container__title}>
        Inscription
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

        <InputField
          name={'Adresse Mail'}
          state={email}
          inputID={'email'}
          type={'text'}
          handleFunction={handleChangeEmail}
        />

        <InputField
          name={'Mot de passe'}
          state={password}
          inputID={'password'}
          type={'password'}
          handleFunction={handleChangePassword}
        />

        <InputField
          name={'Confirmer le mot de passe'}
          state={confirmPassword}
          inputID={'confirm-password'}
          type={'password'}
          handleFunction={handleChangeConfirmPassword}
        />

        <p className={styles.warning}>
          {warningMessage}
        </p>
        
        <button
          className={styles.submit_button}
          type='submit'
        >
          S'inscrire
        </button>

      </form>
    </section>
  );
};

export default SignUp;