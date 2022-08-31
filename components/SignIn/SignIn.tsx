import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './SignIn.module.scss';
import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import Loader from '../Loader/Loader';
import PasswordField from '../PasswordField/PasswordField';
import CheckButton from '../CheckButton/CheckButton';

type SignInProps = {
  handleToggleForm: Function
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUserLogged: React.Dispatch<React.SetStateAction<UserTypes>>
};

type DataTypes = {
  user: UserTypes,
  token: string,
  message: string
};

type UserTypes = {
  id: string,
  pseudo: string,
  password: string,
  email: string,
  avatar?: string,
  is_admin: boolean,
  is_banished: boolean
};

const SignIn = ({
  handleToggleForm,
  setIsLogged,
  setUserLogged
}: SignInProps) => {

  const router = useRouter();

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('adrienlcp@gmail.com');
  const [password, setPassword] = useState<string>('!xJeLth!P4!psnjT');
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisableButton(true);
    setShowLoader(true);

    const body = { 
      pseudoOrEmail,
      password,
      rememberMe
    }
  
    await fetch(`/api/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {

      const data = await res.json();

      if(data.user.is_banished === true) {

        router.push('/banned');

      } else {
        if(data.message === 'OK') {
      
          localStorage.setItem('token', data.token);
          setUserLogged(data.user);
          setIsLogged(true);
          setShowLoader(false);

          router.push('/');
          
        } else {
          setWarningMessage("L'identifiant et le mot de passe ne correspondent pas");
          setShowLoader(false);
        };
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage("Un problème est survenu. Réessayez ou contactez-nous");
      setShowLoader(false);
    });
    
    setPassword('');
    setDisableButton(false);
  };

  const getRefreshToken = async (data: DataTypes) => {

    await fetch('/api/user/getRefreshToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${data.token}`
      },
      body: JSON.stringify(data.user)
    })
    .then(async(res) => {
      const refreshToken = await res.json();
      
      localStorage.setItem('refresh-token', refreshToken);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleChangePseudoOrEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPseudoOrEmail(e.target.value);
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
            autoFocus={true}
            handleFunction={handleChangePseudoOrEmail}
          />

          <PasswordField
            name={'Mot de passe'}
            inputID={'password'}
            password={password}
            setPassword={setPassword}
          />

          <CheckButton
            label={"Se souvenir de moi"}
            id={"remember-me"}
            title={"Me connecter automatiquement à ma prochaine visite"}
            state={rememberMe}
            setState={setRememberMe}
          />

          { warningMessage && (
            <Warning
              warningMessage={warningMessage}
              setWarningMessage={setWarningMessage}
            />
          )}
          
          <input
            className={styles.submit_button}
            title='Se connecter'
            type='submit'
            value='Connexion'
            disabled={disableButton}
          />
        </form>

        <button
          className={styles.secondary_button}
          type='button'
          title='Créer un nouveau compte'
          aria-label='Créer un nouveau compte'
          onClick={() => handleToggleForm()}
        >
          Nouveau ?
          <br/>
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