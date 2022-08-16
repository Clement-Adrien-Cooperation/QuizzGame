import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SignIn.module.scss';
import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import Loader from '../Loader/Loader';

type SignInProps = {
  handleToggleForm: Function,
  setIsLogged: Function,
  setUserLogged: Function
};

type UserTypes = {
  id: number,
  pseudo: string,
  password: string,
  email: string,
  avatar?: string,
  is_admin: boolean,
  is_banished: boolean
};

const SignIn = ({ handleToggleForm, setIsLogged, setUserLogged } : SignInProps) => {

  const router = useRouter();

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('adrienlcp@gmail.com');
  const [password, setPassword] = useState<string>('TDYQCM&S3o!zao6i');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const checkPassword = (data: UserTypes) => {
    
    // If password is correct
    if(password === data.password) {
      // update logged state
      setIsLogged(true);

      // Set data from database
      const userData = {
        id: data.id,
        pseudo: data.pseudo,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
        is_admin: data.is_admin,
        is_banished: data.is_banished
      };

      // Update state for logged user
      setUserLogged(userData);
      
      // Hide loader
      setShowLoader(false);

      // & redirect to home page
      router.push('/');

    } else {
      setShowLoader(false);
      setWarningMessage(`L'identifiant et le mot de passe ne correspondent pas`);
    };
  };

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
      
      checkPassword(data);
    })
    .catch((error) => {
      console.log(error);
    });
    
    setPassword('');
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
            required={true}
            handleFunction={handleChangePseudoOrEmail}
          />

          <InputField
            name={'Mot de passe'}
            state={password}
            inputID={'password'}
            type={'password'}
            isDisabled={false}
            required={true}
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