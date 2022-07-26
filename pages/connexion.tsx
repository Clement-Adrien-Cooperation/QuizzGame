import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const Connexion: NextPage = ({ setIsLogged, setUserLogged }:any) => {

  const [showSignUp, setShowSignUp] = useState<boolean>(true);
  const [showSignIn, setShowSignIn] = useState<boolean>(false);

  const handleToggleForm = () => {

    if(showSignUp) {
      setShowSignUp(false);
      setShowSignIn(true);
    } else {
      setShowSignIn(false);
      setShowSignUp(true);
    };
  };

  return (
    <section className={styles.container}>

      <div className={styles.sign_up}>
        {showSignUp && (

          <SignUp
            handleToggleForm={handleToggleForm}
            setIsLogged={setIsLogged}
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