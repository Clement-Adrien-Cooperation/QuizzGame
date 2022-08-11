import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

const Connexion: NextPage = ({ setIsLogged, setUserLogged, isLogged, userLogged }:any) => {

  const router = useRouter();
  
  const [toggleForm, setToggleForm] = useState(false);

  useEffect(() => {

    if(isLogged) {
      router.push('/');
    } else {
      document.title = "Connexion - s'Quizz Game";
    };
  }, []);

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  return (
    <section className={styles.container}>

        {toggleForm ? (
          <div className={styles.sign_up}>

            <SignUp
              handleToggleForm={handleToggleForm}
              setIsLogged={setIsLogged}
              setUserLogged={setUserLogged}
              isLogged={isLogged}
              userLogged={userLogged}
            />
          </div>
        ) : (
          <div className={styles.sign_in}>
            <SignIn
              handleToggleForm={handleToggleForm}
              setIsLogged={setIsLogged}
              setUserLogged={setUserLogged}
            />
          </div>
        )}
    </section>
  );
};

export default Connexion;