import type { Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useState, useEffect } from 'react';
import { api } from '../../api/api';
import { useRouter } from 'next/router';
import styles from './SignIn.module.scss';
import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import PasswordField from '../PasswordField/PasswordField';
import CheckButton from '../CheckButton/CheckButton';

type Props = {
  handleToggleForm: () => void,
  isLogged: boolean,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>
};

const SignIn: FunctionComponent<Props> = ({
  handleToggleForm,
  isLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  setPageTitle
}) => {

  const router = useRouter();

  const [pseudoOrEmail, setPseudoOrEmail] = useState<string>('adrienlcp@gmail.com');
  const [password, setPassword] = useState<string>('!xJeLth!P4!psnjT');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if(isLogged) {
      router.push('/');
    } else {
      setPageTitle("S'inscrire - s'Quizz Game");
    };
  }, []);

  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDisableButton(true);
    setShowLoader(true);

    const body = { 
      pseudoOrEmail,
      password,
      rememberMe
    };
    await fetch(`${api}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {

      if(res.status === 200) {

        const data = await res.json();
        localStorage.setItem('token', data.token);
        setUserLogged(data.user);
        setIsLogged(true);
        setShowLoader(false);

        if(data.user.is_banished) {
          router.push('/banned');
        } else {
          router.push('/');
        };
      } else {
        setWarningMessage("L'identifiant et le mot de passe ne correspondent pas");
        setShowLoader(false);
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage("L'identifiant et le mot de passe ne correspondent pas");
      setShowLoader(false);
    });

    setPassword('');
    setDisableButton(false);
  };

  return (
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
          setState={setPseudoOrEmail}
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

        {warningMessage && 
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        }

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
  );
};

export default SignIn;