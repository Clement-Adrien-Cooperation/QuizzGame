import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const Connexion: NextPage = ({ setIsLogged, setUserLogged }:any) => {

  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(true);

  useEffect(() => {

    document.title = "Connexion - s'Quizz Game";

  }, []);

  const handleToggleForm = () => {

    setShowSignIn(!showSignIn);
    setShowSignUp(!showSignUp);
  };

  return (
    <section className={styles.container}>

      <div className={styles.sign_up}>
        {showSignUp && (

          <SignUp
            handleToggleForm={handleToggleForm}
            setIsLogged={setIsLogged}
            setUserLogged={setUserLogged}
          />
        )}
      </div>
      
      <div className={styles.sign_in}>
        {showSignIn && (

          <SignIn
            handleToggleForm={handleToggleForm}
            setIsLogged={setIsLogged}
            setUserLogged={setUserLogged}
          />
        )}
      </div>
    </section>
  );
};

export default Connexion;