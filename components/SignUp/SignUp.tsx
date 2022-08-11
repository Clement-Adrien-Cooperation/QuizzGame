import styles from './SignUp.module.scss';
import EditProfile from '../EditProfile/EditProfile';

type UserTypes = {
  id: number,
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

      <EditProfile
        userLogged={userLogged}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        setUserLogged={setUserLogged}
      />

      <button
        className={styles.secondary_button}
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