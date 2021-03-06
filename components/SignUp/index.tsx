import { useState } from 'react';
import styles from './SignUp.module.scss';

import InputField from '../InputField';
import Warning from '../Warning';
import Loader from '../Loader';

type SignUpProps = {
  handleToggleForm: Function
};

const SignUp = ({ handleToggleForm } : SignUpProps) => {

  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail]= useState<string>('');
  const [password, setPassword]= useState<string>('');
  const [confirmPassword, setConfirmPassword]= useState<string>('');

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const checkForm = () => {

    // If form is not filled
    if(pseudo.trim() === ''
    || email.trim() === ''
    || password.trim() === ''
    || confirmPassword.trim() === '') {

      // We warn user
      setWarningMessage('Veuillez remplir tous les champs');
      setDisableButton(true);

    // If email is not valid
    } else if (!email.includes('@') && !email.includes('.')) {

      // We warn him too
      setWarningMessage('Veuillez entrer un email valide');
      setDisableButton(true);

    // If the two passwords are not the same
    } else if (password !== confirmPassword) {

      // Same routine..
      setWarningMessage('Les deux mots de passe ne correspondent pas');
      setDisableButton(true);
    
    } else if (password.length < 10 || password.length > 1000) {

      setWarningMessage('Votre mot de passe doit contenir entre 10 et 1000 caractères');
      setDisableButton(true);

    } else if (pseudo.length > 30) {
      
      setWarningMessage('Votre pseudo ne doit pas excéder 30 caractères');
      setDisableButton(true);

    } else if (email.length > 100) {

      setWarningMessage('Votre adresse mail ne doit pas excéder 100 caractères');
      setDisableButton(true);

    } else if (
      password.length > 1000 && password.length < 10
      || 
      confirmPassword.length > 1000 && confirmPassword.length < 10) {

      setWarningMessage('Votre mot de passe doit contenir entre 10 et 1000 caractères');
      setDisableButton(true);

    } else {
      return true;
    };
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the refresh
    e.preventDefault();
    setDisableButton(true);

    // Reset the warning message
    setWarningMessage('');

    if(checkForm()) {

      // Show loader
      setShowLoader(true);

      // If everything is ok, set up the body
      const body = { pseudo, email, password };

      // & create a new user
      await fetch(`/api/createOneUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      // Reset states & hide loader
      setPseudo('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setShowLoader(false);

      // Then, we can show sign in form (to change)
      handleToggleForm();
    };

    setDisableButton(false);
  };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {

    // If pseudo is longer than 30 letters
    if(pseudo.length > 30) {
      // We warn user
      setWarningMessage('Votre pseudo ne doit pas excéder 30 caractères');
      setDisableButton(true);
    } else {
      // If not, we update state
      setWarningMessage('');
      setDisableButton(false);
    };

    setPseudo(e.target.value);
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(email.length > 100) {
      setWarningMessage('Votre adresse mail ne doit pas excéder 100 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');
      setDisableButton(false);
    };

    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(password.length > 1000) {
      setWarningMessage('Votre mot de passe ne doit pas excéder 1000 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');
      setDisableButton(false);
    };

    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(confirmPassword.length > 1000) {
      setWarningMessage('Votre mot de passe ne doit pas excéder 1000 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');
      setDisableButton(false);
    };

    setConfirmPassword(e.target.value);
  };
  
  return (
    <>
      <section className={styles.container}>

        <h2 className={styles.container__title}>
          Créer un compte
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
            isDisabled={false}
            handleFunction={handleChangePseudo}
          />

          <InputField
            name={'Adresse Mail'}
            state={email}
            inputID={'email'}
            type={'text'}
            isDisabled={false}
            handleFunction={handleChangeEmail}
          />

          <InputField
            name={'Mot de passe'}
            state={password}
            inputID={'password'}
            type={'password'}
            isDisabled={false}
            handleFunction={handleChangePassword}
          />

          <InputField
            name={'Confirmer le mot de passe'}
            state={confirmPassword}
            inputID={'confirm-password'}
            type={'password'}
            isDisabled={false}
            handleFunction={handleChangeConfirmPassword}
          />

          { warningMessage && (
            <Warning
              warningMessage={warningMessage}
              setWarningMessage={setWarningMessage}
            />
          )}
          
          <input
            className={styles.submit_button}
            type='submit'
            value='Inscription'
            disabled={disableButton}
          />

        </form>

        <button
          className={styles.secondary_button}
          onClick={() => handleToggleForm()}
        >
          Déjà un compte ?
          <br />
          Se connecter
        </button>

      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default SignUp;