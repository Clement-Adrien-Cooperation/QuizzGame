import type { NextPage } from 'next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';
import { User } from '@prisma/client';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Connexion: NextPage<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader
}) => {

  const router = useRouter();
  
  const [toggleForm, setToggleForm] = useState(false);
  
  useEffect(() => {

    document.title = "Connexion - s'Quizz Game";

    if(isLogged) {
      router.push('/');
    };
  }, []);

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };

  return (
    <section className={styles.container}>

        {toggleForm ?
          <div className={styles.sign_up}>
            <SignUp
              handleToggleForm={handleToggleForm}
              setIsLogged={setIsLogged}
              setUserLogged={setUserLogged}
              isLogged={isLogged}
              userLogged={userLogged}
              setShowLoader={setShowLoader}
            />
          </div>
        :
          <div className={styles.sign_in}>
            <SignIn
              handleToggleForm={handleToggleForm}
              setIsLogged={setIsLogged}
              setUserLogged={setUserLogged}
              setShowLoader={setShowLoader}
            />
          </div>
        }
    </section>
  );
};

export default Connexion;