import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp';
import SignIn from '../components/SignIn';

const Connexion: NextPage = () => {

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

  const [showSignUp, setShowSignUp] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);

  const handleToggleForm = () => {

    if(showSignUp) {

      setShowSignIn(true);

      signInRef.current?.classList.add('selected');
      signUpRef.current?.classList.remove('selected');

      setTimeout(() => {
        setShowSignUp(false);
      }, 300);
    } else {
      setShowSignUp(true);

      signUpRef.current?.classList.add('selected');
      signInRef.current?.classList.remove('selected');

      setTimeout(() => {
        setShowSignIn(false);
      }, 300);
    };
  };

  return (
    <section className={styles.container}>

      <div
        ref={signUpRef}
        className={styles.sign_up}
      >
        {showSignUp && (

          <SignUp
            handleToggleForm={handleToggleForm}
          />
        )}
      </div>
      
      <div
        ref={signInRef}
        className={styles.sign_in}
      >
        {showSignIn && (

          <SignIn
            handleToggleForm={handleToggleForm}
          />
        )}
      </div>
    </section>
  );
};

export default Connexion;