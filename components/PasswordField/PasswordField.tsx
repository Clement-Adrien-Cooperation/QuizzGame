import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { useState } from 'react';
import styles from './PasswordField.module.scss';
import InputField from '../InputField/InputField';
import IconEye from '../Icons/IconEye';
import IconHiddenEye from '../Icons/IconHiddenEye';

type Props = {
  name: string,
  inputID: string,
  password: string,
  setPassword: Dispatch<SetStateAction<string>>
};

const PasswordField: FunctionComponent<Props> = ({
  name,
  inputID,
  password,
  setPassword
}) => {

  const [showPassword, setShowPassword] = useState<boolean>(false);

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
        setState={setPassword}
      />

      {password.length > 0 &&
        <button
          className={styles.icon}
          type='button'
          title={showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
          aria-label={showPassword ? "Cacher le mot de passe" : "Montrer le mot de passe"}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <IconEye /> : <IconHiddenEye />}
        </button>
      }
    </div>
  );
};

export default PasswordField;