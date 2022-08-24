import styles from './SignUp.module.scss';
import EditUser from '../EditUser/EditUser';

type UserTypes = {
  id: string,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type SignUpProps = {
  handleToggleForm: Function,
  setIsLogged: Function,
  setUserLogged: Function,
  isLogged: boolean
  userLogged: UserTypes,
};

const SignUp = ({
  handleToggleForm,
  setIsLogged,
  setUserLogged,
  isLogged,
  userLogged
}: SignUpProps) => {

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