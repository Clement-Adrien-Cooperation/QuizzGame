import type { Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import { useEffect, useState } from 'react';
import CheckButton from '../CheckButton/CheckButton';
import InputField from '../InputField/InputField';
import PasswordField from '../PasswordField/PasswordField';
import PasswordValidation from '../PasswordValidation/PasswordValidation';
import Warning from '../Warning/Warning';
import styles from './EditUser.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const EditUser: FunctionComponent<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader
}) => {

  const router = useRouter();

  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [previousPassword, setPreviousPassword] = useState<string>('');
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [notification, setNotification] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);

  const [validLowercase, setValidLowercase] = useState<boolean>(false);
  const [validUppercase, setValidUppercase] = useState<boolean>(false);
  const [validNumber, setValidNumber] = useState<boolean>(false);
  const [validSpecial, setValidSpecial] = useState<boolean>(false);
  const [validLength, setValidLength] = useState<boolean>(false);

  useEffect(() => {
    if(isLogged) {
      setPseudo(userLogged.pseudo);
      setEmail(userLogged.email);
    };
  }, []);

  const checkPasswords = () => {

    if(password !== '' && password === confirmPassword) {
      setNotification('Les deux mots de passe correspondent ✅');
      setWarningMessage('');
    } else {
      setNotification('');
    };
  };

  const checkPassword = () => {

    const lowercase = new RegExp('(?=.*[a-z])');
    const uppercase = new RegExp('(?=.*[A-Z])');
    const number = new RegExp('(?=.*[0-9])');
    const special = new RegExp('(?=.*[!@#\$%\^&\*])');
    const length = new RegExp('(?=.{8,})');

    if(lowercase.test(password)) {
      setValidLowercase(true);
    } else {
      setValidLowercase(false);
    };

    if(uppercase.test(password)) {
      setValidUppercase(true);
    } else {
      setValidUppercase(false);
    };

    if(number.test(password)) {
      setValidNumber(true);
    } else {
      setValidNumber(false);
    };

    if(special.test(password)) {
      setValidSpecial(true);
    } else {
      setValidSpecial(false);
    };

    if(length.test(password)) {
      setValidLength(true);
    } else {
      setValidLength(false);
    };
  };

  const checkForm = () => {

    if(!email.includes('@') && !email.includes('.')) {

      setWarningMessage('Veuillez entrer un email valide');
      setDisableButton(true);
      return false;

    } else if(pseudo.includes('@') && pseudo.includes('.')) {

      setWarningMessage(`Votre pseudo ne doit pas contenir de "@" ou de ".", ces caractères sont réservés au champs "Adresse mail"`);
      setDisableButton(true);
      return false;

    } else if(password !== confirmPassword) {

      setWarningMessage('Les deux mots de passe ne correspondent pas');
      setDisableButton(true);
      return false;

    } else if(pseudo.trim().length < 3|| pseudo.trim().length > 30) {

      setWarningMessage('Votre pseudo doit contenir entre 3 et 30 caractères');
      setDisableButton(true);
      return false;

    } else if(email.trim().length < 7 || email.trim().length > 100) {

      setWarningMessage('Veuillez entrer une adresse mail valide');
      setDisableButton(true);
      return false;

    } else if(pseudo.trim() === '') {
      setWarningMessage('Veuillez entrer un pseudo valide');
      return false;
    };

    if(isLogged) {
      if(previousPassword !== ''
      && password !== ''
      && confirmPassword !== '') {

        if(!validLowercase &&
          !validUppercase &&
          !validNumber &&
          !validSpecial &&
          !validLength) {

          setWarningMessage('Votre mot de passe doit contenir 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial et 8 caractères au minimum');
          setDisableButton(true);
          return false;
        };

        if(password !== confirmPassword) {

          setWarningMessage('Les nouveaux mots de passe ne correspondent pas');
          setDisableButton(true);
          return false;
        };
      };

    } else {
      if(!validLowercase ||
        !validUppercase ||
        !validNumber ||
        !validSpecial ||
        !validLength) {

        setWarningMessage('Votre mot de passe doit contenir 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial et 8 caractères au minimum');
        setDisableButton(true);
        return false;
      };
    };

    return true;
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    // Prevent the refresh
    event.preventDefault();
    setDisableButton(true);

    // Reset the warning message
    setWarningMessage('');

    if(checkForm()) {

      // Show loader
      setShowLoader(true);

      editUser();

      // Reset states & hide loader
      setPseudo('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    };

    setDisableButton(false);
  };

  const changePassword = async () => {

    const token = localStorage.getItem('token');

    const body = {
      id: userLogged.id,
      previousPassword,
      newPassword: password
    };

    await fetch(`${api}/user/updatePassword`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(() => {
      console.log('Success');
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const updateUser = async () => {

    let body = {
      id: userLogged.id,
      pseudo: pseudo.trim(),
      email: email.trim()
    };

    // If user try to change his password
    if(previousPassword !== '' && password !=='') {
      await changePassword();
    };

    const token = localStorage.getItem('token');

    // update user
    await fetch(`${api}/user/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 401) {
        if(data.meta.target.includes('pseudo')) {

          setWarningMessage('Ce pseudo est déjà pris');

        } else if(data.meta.target.includes('email')) {

          setWarningMessage('Cet adresse email est déjà utilisée');

        } else {
          setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
        };

      // If response status is 200 (OK),
      } else if(res.status === 200) {
        // update state with user's data
        setPseudo(data.pseudo);
        setEmail(data.email);
        setUserLogged(data);

      } else {
        setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
      };

      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
      setShowLoader(false);
    });

  };

  const createUser = async () => {

    const body = {
      pseudo: pseudo.trim(),
      email: email.trim(),
      password,
      rememberMe
    };

    await fetch(`${api}/user/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {

      const data = await res.json();

      if(res.status === 401) {
        if(data.meta.target.includes('pseudo')) {

          setWarningMessage('Ce pseudo est déjà pris');

        } else if(data.meta.target.includes('email')) {

          setWarningMessage('Cet adresse email est déjà utilisée');

        } else {
          setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
        };
      } else if(res.status === 201) {
        // If response status is 201 (created),

        // save the token in local storage
        localStorage.setItem('token', data.token);

        // update states with user's data and push to home page
        setUserLogged(data.user);
        setIsLogged(true);
        setShowLoader(false);

        router.push('/');
      } else {
        setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
      };

      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
      setShowLoader(false);
    });
  };

  const editUser = () => {
    // If user is logged, this is an update
    if(isLogged) {
      updateUser();
    // If he's not logged, this is a creation
    } else {
      createUser();
    };
  };

  useEffect(() => {
    // If pseudo is longer than 30 letters
    if(pseudo.length > 30) {
      // We warn user
      setWarningMessage('Votre pseudo ne doit pas excéder 30 caractères');
      setDisableButton(true);
    } else if (pseudo.includes('@') && pseudo.includes('.')) {

      setWarningMessage(`Votre pseudo ne doit pas contenir de "@" ou de ".", ces caractères sont réservés au champs "Adresse mail"`);
      setDisableButton(true);
    } else {
      // If not, we update state
      setWarningMessage('');
      setDisableButton(false);
    };
  }, [pseudo]);

  useEffect(() => {
    if(email.length > 100) {
      setWarningMessage('Votre adresse mail ne doit pas excéder 100 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');
      setDisableButton(false);
    };
  }, [email]);

  return (
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
        required={true}
        autoFocus={true}
        setState={setPseudo}
      />

      <InputField
        name={'Adresse Mail'}
        state={email}
        inputID={'email'}
        type={'text'}
        isDisabled={false}
        required={true}
        autoFocus={false}
        setState={setEmail}
      />

      {isLogged && 
        <PasswordField
          name={'Ancien mot de passe'}
          inputID={'previous-password'}
          password={previousPassword}
          setPassword={setPreviousPassword}
        />
      }

      <PasswordValidation
        isLogged={isLogged}
        password={password}
        confirmPassword={confirmPassword}
        setPassword={setPassword}
        setConfirmPassword={setConfirmPassword}
        validLowercase={validLowercase}
        validUppercase={validUppercase}
        validNumber={validNumber}
        validSpecial={validSpecial}
        validLength={validLength}
        checkPassword={checkPassword}
        checkPasswords={checkPasswords}
      />

      {!isLogged &&
        <CheckButton
          label={"Se souvenir de moi"}
          id={"remember-me"}
          title={"Me connecter automatiquement à ma prochaine visite"}
          state={rememberMe}
          setState={setRememberMe}
        />
      }

      {notification &&
        <p className={styles.notification}>
          {notification}
        </p>
      }

      {warningMessage &&
        <Warning
          warningMessage={warningMessage}
          setWarningMessage={setWarningMessage}
        />
      }

      <input
        className={styles.submit_button}
        type='submit'
        title={isLogged ? "Mettre à jour le profil" : "Finaliser mon inscription"}
        aria-label={isLogged ? "Mettre à jour le profil" : "Finaliser mon inscription"}
        value={isLogged ? 'Sauvegarder' : 'Inscription'}
        disabled={disableButton}
      />
    </form>
  );
};

export default EditUser;