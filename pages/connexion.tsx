import type { NextPage } from 'next';
import { useRef, useState } from 'react';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const Connexion: NextPage = () => {

  const signInRef = useRef<HTMLDivElement>(null);
  const signUpRef = useRef<HTMLDivElement>(null);

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

    // if(showSignUp) {

    //   setShowSignIn(true);

    //   signInRef.current?.classList.add('selected');
    //   signUpRef.current?.classList.remove('selected');

    //   setTimeout(() => {
    //     setShowSignUp(false);
    //   }, 300);
    // } else {
    //   setShowSignIn(false);
    //   setShowSignUp(true);

    //   signUpRef.current?.classList.add('selected');
    //   signInRef.current?.classList.remove('selected');

    //   setTimeout(() => {
    //   }, 300);
    // };
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