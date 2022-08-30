import { useState } from 'react';
import Image from 'next/image';
import styles from './PasswordField.module.scss';
import InputField from '../InputField/InputField';
import eye_visible from '../../public/icons/eye_visible.svg';
import eye_hidden from '../../public/icons/eye_hidden.svg';

type PasswordFieldProps = {
  name: string,
  inputID: string,
  password: string,
  setPassword: React.Dispatch<React.SetStateAction<string>>
};

const PasswordField = ({
  name,
  inputID,
  password,
  setPassword
}: PasswordFieldProps) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return(
    <div className={styles.input}>
      <InputField
        name={name}
        state={password}
        inputID={inputID}
        type={showPassword ? 'text' : 'password'}
        isDisabled={false}
        required={true}
        autoFocus={false}
        handleFunction={handleChangePassword}
      />

      {password.length < 1 ? '' :
        <button
          className={styles.icon}
          type='button'
          title={showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
          aria-label={showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
          onClick={() => setShowPassword(!showPassword)}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt={showPassword ? "Un oeil" : "Un oeil barré"}
            src={showPassword ? eye_hidden : eye_visible}
          />
        </button>
      }
    </div>
  );
};

export default PasswordField;