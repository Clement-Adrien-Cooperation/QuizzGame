import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useEffect } from 'react';
import styles from './SignUp.module.scss';
import EditUser from '../EditUser/EditUser';
import { useRouter } from 'next/router';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>,
  handleToggleForm: () => void
};

const SignUp: FunctionComponent<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  setPageTitle,
  handleToggleForm
}) => {

  const router = useRouter();

  useEffect(() => {
    if(isLogged) {
      router.push('/');
    } else {
      setPageTitle("Se connecter - s'Quizz Game");
    };
  }, []);

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
        onClick={handleToggleForm}
      >
        Déjà un compte ?
        <br />
        Se connecter
      </button>

    </section>
  );
};

export default SignUp;