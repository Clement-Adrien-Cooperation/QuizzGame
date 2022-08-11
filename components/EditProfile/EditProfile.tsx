import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import Loader from '../Loader/Loader';
import Warning from '../Warning/Warning';
import styles from './EditProfile.module.scss';

type UserTypes = {
  id: number,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type EditProfileProps = {
  isLogged: boolean,
  userLogged: UserTypes,
  setIsLogged: Function,
  setUserLogged: Function
};

const EditProfile = ({ isLogged, userLogged, setIsLogged, setUserLogged } :EditProfileProps) => {

  const router = useRouter();

  const [currentPseudo, setCurrentPseudo] = useState<string>('');
  const [previousPassword, setPreviousPassword] = useState<string>('');
  
  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail]= useState<string>('');
  const [password, setPassword]= useState<string>('');
  const [confirmPassword, setConfirmPassword]= useState<string>('');
  
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if(isLogged) {
      setCurrentPseudo(userLogged.pseudo);
      setPseudo(userLogged.pseudo);
      setEmail(userLogged.email);
    };
  }, []);
  
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

    // same with pseudo
    } else if (pseudo.includes('@') && pseudo.includes('.')) {

      setWarningMessage(`Votre pseudo ne doit pas contenir de "@" ou de ".", ces caractères sont réservés au champs "Adresse mail"`);
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

    } else if (previousPassword !== '' || password !== '' || confirmPassword !== '') {

      if(previousPassword !== userLogged.password
        && password !== confirmPassword) {
          setWarningMessage("L'ancien mot de passe et/ou les nouveaux ne correspondent pas");
          setDisableButton(true);
      };
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

      await editUser();

      // Reset states & hide loader
      setPseudo('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    };

    setDisableButton(false);
  };

  const editUser = async() => {

    // If user is logged, this is a update
    if(isLogged) {

      let body = {
        pseudo,
        email,
        password,
        is_admin: userLogged.is_admin
      };

      // If user try to change his password
      if(previousPassword !== '') {
        // Change it on the body
        body.password = password;
      };

      await fetch(`/api/user/upsert`, {
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


    } else {
      const is_admin = false;

      // If everything is ok, set up the body
      const body = { pseudo, email, password, is_admin };

      // & create a new user
      await fetch(`/api/user/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(async() => {

        const body = { pseudoOrEmail: pseudo }

        await fetch(`/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        .then(async(res) => {
          
          const data = await res.json();

          const userData = {
            id: data.id,
            pseudo: data.pseudo,
            is_admin: data.is_admin,
            is_banished: data.is_banished
          };

          setIsLogged(true);
          setUserLogged(userData);
          setShowLoader(false);
          
          router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.error(error);
      });
    };
  };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {

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

  const handleChangePreviousPassword = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(previousPassword.length > 1000) {
      setWarningMessage('Votre mot de passe ne doit pas excéder 1000 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');
      setDisableButton(false);
    };

    setPreviousPassword(e.target.value);
  };
  

  return (    
    <>
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
          required={isLogged ? false : true}
          handleFunction={handleChangePseudo}
        />

        <InputField
          name={'Adresse Mail'}
          state={email}
          inputID={'email'}
          type={'text'}
          isDisabled={false}
          required={isLogged ? false : true}
          handleFunction={handleChangeEmail}
        />
        
        {isLogged && (
          <InputField
            name={'Ancien mot de passe'}
            state={previousPassword}
            inputID={'previous-password'}
            type={'password'}
            isDisabled={false}
            required={false}
            handleFunction={handleChangePreviousPassword}
          />
        )}

        <InputField
          name={isLogged ? 'Nouveau mot de passe' : 'Mot de passe'}
          state={password}
          inputID={'password'}
          type={'password'}
          isDisabled={false}
          required={isLogged ? false : true}
          handleFunction={handleChangePassword}
        />

        <InputField
          name={'Confirmer le mot de passe'}
          state={confirmPassword}
          inputID={'confirm-password'}
          type={'password'}
          isDisabled={false}
          required={isLogged ? false : true}
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
          value={isLogged ? 'Sauvegarder' : 'Inscription'}
          disabled={disableButton}
        />
      </form>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default EditProfile;