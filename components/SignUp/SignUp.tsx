import { User } from '@prisma/client';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';
import styles from './SignUp.module.scss';
import EditUser from '../EditUser/EditUser';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  handleToggleForm: () => void
};

const SignUp: FunctionComponent<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  handleToggleForm
}) => {

  return (
    <section className={styles.container}>

      <h1 className={styles.container__title}>
        Créer un compte
      </h1>

      <EditUser
        userLogged={userLogged}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setUserLogged={setUserLogged}
        setShowLoader={setShowLoader}
      />

      <button
        className={styles.secondary_button}
        type='button'
        title='Se connecter à un compte'
        aria-label='Se connecter à un compte'
        onClick={() => handleToggleForm()}
      >
        Déjà un compte ?
        <br />
        Se connecter
      </button>

    </section>
  );
};

export default SignUp;