import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useState } from 'react';
import PasswordField from '../PasswordField/PasswordField';
import styles from './PasswordValidation.module.scss';

type Props = {
  isLogged: boolean,
  password: string,
  confirmPassword: string,
  setPassword: Dispatch<SetStateAction<string>>,
  setConfirmPassword: Dispatch<SetStateAction<string>>,
  validLowercase: boolean,
  validUppercase: boolean,
  validNumber: boolean,
  validSpecial: boolean,
  validLength: boolean,
  checkPassword: Function,
  checkPasswords: Function
};

const PasswordValidation: FunctionComponent<Props> = ({
  isLogged,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  validLowercase,
  validUppercase,
  validNumber,
  validSpecial,
  validLength,
  checkPassword,
  checkPasswords
}) => {

  const [showValidation, setShowValidation] = useState<boolean>(false);

  return (
    <>
      <div
        className={styles.inputBox}
        onFocus={() => setShowValidation(true)}
        onBlur={() => setShowValidation(false)}
        onKeyUp={() => {
          checkPassword();
          checkPasswords();
        }}
      >
        <PasswordField
          name={isLogged ? 'Nouveau mot de passe' : 'Mot de passe'}
          inputID={'password'}
          password={password}
          setPassword={setPassword}
        />
      </div>

      <div
        className={styles.inputBox}
        onKeyUp={() => checkPasswords()}
      >
        <PasswordField
          name={'Confirmer le mot de passe'}
          inputID={'confirm-password'}
          password={confirmPassword}
          setPassword={setConfirmPassword}
        />
      </div>
  
      <ul
        className={
          showValidation ?
            `${styles.list} ${styles.opened}`
          :
            `${styles.list}`
        }
      >
        <li
          className={
            validLowercase ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
          key={'1'}
        >
          Au moins une lettre minuscule
        </li>
        <li
          className={
            validUppercase ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
          key={'2'}
        >
          Au moins une lettre majuscule
        </li>
        <li
          className={
            validNumber ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
          key={'3'}
        >
          Au moins un chiffre
        </li>
        <li
          className={
            validSpecial ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
          key={'4'}
        >
          Au moins un caractère spécial
        </li>
        <li
          className={
            validLength ?
              `${styles.item} ${styles.valid}`
            :
              `${styles.item}`
          }
          key={'5'}
        >
          Au moins 8 caractères
        </li>
      </ul>
    </>
  );
};

export default PasswordValidation;