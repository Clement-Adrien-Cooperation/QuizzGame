import type { NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import styles from '../styles/Connexion.module.scss';
import SignUp from '../components/SignUp/SignUp';
import SignIn from '../components/SignIn/SignIn';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Connexion: NextPage<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  setPageTitle
}) => {

  const [toggleForm, setToggleForm] = useState(false);

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
              setPageTitle={setPageTitle}
            />
          </div>
        :
          <div className={styles.sign_in}>
            <SignIn
              isLogged={isLogged}
              handleToggleForm={handleToggleForm}
              setIsLogged={setIsLogged}
              setUserLogged={setUserLogged}
              setShowLoader={setShowLoader}
              setPageTitle={setPageTitle}
            />
          </div>
        }
    </section>
  );
};

export default Connexion;