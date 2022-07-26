import { useState } from 'react';
import styles from './SignIn.module.scss';

import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import Loader from '../Loader/Loader';

type SignInProps = {
  handleToggleForm: Function
};

const SignIn = ({ handleToggleForm } : SignInProps) => {

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('adrienlcp@gmail.com');
  const [password, setPassword] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    setShowLoader(true);

    const body = { pseudoOrEmail }
  
    await fetch(`/api/user/login`, {
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
    
    setPassword('');
    setShowLoader(false);
    setDisableButton(false);
  };

  const handleChangePseudoOrEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudoOrEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <section className={styles.container}>

        <h1 className={styles.container__title}>
          Se connecter
        </h1>

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >

          <InputField
            name={'Pseudo ou Email'}
            state={pseudoOrEmail}
            inputID={'ID'}
            type={'text'}
            isDisabled={false}
            handleFunction={handleChangePseudoOrEmail}
          />

          <InputField
            name={'Mot de passe'}
            state={password}
            inputID={'password'}
            type={'password'}
            isDisabled={false}
            handleFunction={handleChangePassword}
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
            value='Connexion'
            disabled={disableButton}
          />

        </form>

        <button
          className={styles.secondary_button}
          onClick={() => handleToggleForm()}
        >
          Se créer un compte
        </button>

      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default SignIn;