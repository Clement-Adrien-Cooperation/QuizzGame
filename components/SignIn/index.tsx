import { useState } from 'react';
import styles from './SignIn.module.scss';

import InputField from '../InputField';
import Warning from '../Warning';

type SignInProps = {
  handleToggleForm: () => void
};

const SignIn = ({ handleToggleForm } : SignInProps) => {

  // const [pseudoOrEmail, setPseudoOrEmail] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);

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
    
    setDisableButton(false);
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
          isDisabled={false}
          handleFunction={handleChangePseudo}
        />

        {/* <InputField
          name={'adresse mail'}
          state={email}
          inputID={'email'}
          type={'text'}
          isDisabled={false}
          handleFunction={handleChangeEmail}
        /> */}

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
  );
};

export default SignIn;