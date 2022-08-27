import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import InputField from '../InputField/InputField';
import Loader from '../Loader/Loader';
import Warning from '../Warning/Warning';
import styles from './EditUser.module.scss';

type UserTypes = {
  id: string,
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
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>,
  setUserLogged: React.Dispatch<React.SetStateAction<UserTypes>>
};

const EditUser = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged
}: EditProfileProps) => {

  const router = useRouter();

  const [pseudo, setPseudo] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [previousPassword, setPreviousPassword] = useState<string>('');

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if(isLogged) {
      setPseudo(userLogged.pseudo);
      setEmail(userLogged.email);
    };
  }, []);

  const checkForm = () => {

    if(!email.includes('@') && !email.includes('.')) {
      
      setWarningMessage('Veuillez entrer un email valide');
      setDisableButton(true);
      return false;

    } else if (pseudo.includes('@') && pseudo.includes('.')) {

      setWarningMessage(`Votre pseudo ne doit pas contenir de "@" ou de ".", ces caractères sont réservés au champs "Adresse mail"`);
      setDisableButton(true);
      return false;

    } else if (password !== confirmPassword) {

      setWarningMessage('Les deux mots de passe ne correspondent pas');
      setDisableButton(true);
      return false;

    } else if (pseudo.length < 3|| pseudo.length > 30) {
      
      setWarningMessage('Votre pseudo doit contenir entre 3 et 30 caractères');
      setDisableButton(true);
      return false;

    } else if (email.length < 7 || email.length > 100) {

      setWarningMessage('Entrez une adresse mail valide');
      setDisableButton(true);
      return false;
    };

    if(isLogged) {
      if(pseudo.trim() === ''
      || email.trim() === '') {

        setWarningMessage("Veuillez remplir tous les champs");
        return false;
      } else if(previousPassword !== ''
      && password !== ''
      && confirmPassword !== '') {
        if(password !== confirmPassword) {

          setWarningMessage('Les nouveaux mots de passe ne correspondent pas');
          setDisableButton(true);
          return false;

        } else if(previousPassword !== userLogged.password) {

          setWarningMessage("L'ancien mot de passe ne correspond pas");
          setDisableButton(true);
          return false;
        };
      };

    } else {
      if(password.length < 10 || password.length > 1000) {

        setWarningMessage('Votre mot de passe doit contenir 10 caractères au minimum');
        setDisableButton(true);
        return false;

      } else if (password.length < 10
        || password.length > 1000
        || confirmPassword.length < 10
        || confirmPassword.length > 1000) {

        setWarningMessage('Votre mot de passe doit contenir 10 caractères au minimum');
        setDisableButton(true);
        return false;
    
      };
    };

    return true;
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

    // If user is logged, this is an update
    if(isLogged) {
      
      let body = {
        currentPseudo: userLogged.pseudo,
        pseudo,
        email,
        password: userLogged.password,
        is_admin: userLogged.is_admin
      };

      // If user try to change his password
      if(previousPassword !== '') {
        // Change it on the body
        body.password = password;
      };

      // update user
      await fetch(`/api/user/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(async(res) => {
        const data = await res.json();
        
        setPseudo(data.pseudo);
        setEmail(data.email);
        
        setShowLoader(false);
      })
      .catch((error) => {
        console.log(error);
        setWarningMessage('Ce pseudo ou cet email est déjà utilisé');
        setShowLoader(false);
      });

    // If he's not logged, this is a creation
    } else {

      // If everything is ok, set up the body
      const body = {
        pseudo,
        email,
        password
      };

      // & create a new user
      await fetch(`/api/user/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(async(res) => {

        const data = await res.json();

        const body = { pseudoOrEmail: data.pseudo }

        await fetch(`/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        .then(async(res) => {
          
          const data = await res.json();

          const userData: UserTypes = {
            id: data.id,
            pseudo: data.pseudo,
            email: data.email,
            password: data.password,
            avatar: data.avatar,
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
          setWarningMessage('Une erreur est survenue. Réessayez ou contactez-nous');
          setShowLoader(false);
        });
      })
      .catch((error) => {
        console.log(error);
        setWarningMessage('Ce pseudo ou cet email est déjà utilisé');
        setShowLoader(false);
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
          required={true}
          autoFocus={true}
          handleFunction={handleChangePseudo}
        />

        <InputField
          name={'Adresse Mail'}
          state={email}
          inputID={'email'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
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
            autoFocus={false}
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
          autoFocus={false}
          handleFunction={handleChangePassword}
        />

        <InputField
          name={'Confirmer le mot de passe'}
          state={confirmPassword}
          inputID={'confirm-password'}
          type={'password'}
          isDisabled={false}
          required={isLogged ? false : true}
          autoFocus={false}
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
          title={isLogged ? "Mettre à jour le profil" : "Finaliser mon inscription"}
          aria-label={isLogged ? "Mettre à jour le profil" : "Finaliser mon inscription"}
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

export default EditUser;