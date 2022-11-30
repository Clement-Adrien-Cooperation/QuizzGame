import type { NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { Quiz, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import styles from '../../styles/Profile.module.scss';
import UserQuizz from '../../components/UserQuizz/UserQuizz';
import UserInfos from '../../components/UserInfos/UserInfos';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>,
  handleDisconnect: () => void
};

const Profile: NextPage<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  setPageTitle,
  handleDisconnect
}) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<Quiz[]>([]);
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);

  useEffect(() => {
    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else {

        setPageTitle("Mon profil - s'Quizz Game");
        getQuizzFromUser();
      };
    } else {
      router.push('/');
    };
  }, []);

  const getQuizzFromUser = async() => {

    await fetch(`${api}/quiz/getUserQuizz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo: userLogged.pseudo })
    })
    .then(async(res) => {
      const data = await res.json();

      setUserQuizz(data);
    })
    .then(() => {
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Ma page de profil
        </h1>

        <button
          className={styles.update}
          type='button'
          title={updateProfile ? "Ouvrir le formulaire de modification du profil" : "Fermer le formulaire de modification du profil"}
          aria-label={updateProfile ? "Ouvrir le formulaire de modification du profil" : "Fermer le formulaire de modification du profil"}
          onClick={() => setUpdateProfile(!updateProfile)}
        >
          {updateProfile ? "Fermer mes informations" : "Modifier mes informations"}
        </button>
      </header>

      <div className={styles.container}>

        <UserInfos
          updateProfile={updateProfile}
          isLogged={isLogged}
          userLogged={userLogged}
          setIsLogged={setIsLogged}
          setUserLogged={setUserLogged}
          setShowLoader={setShowLoader}
          setUpdateProfile={setUpdateProfile}
          handleDisconnect={handleDisconnect}
        />
      </div>

      {userQuizz?.length === 0 ?

        <section className={styles.container}>
          <h2 className={styles.container__title}>
            Vous n'avez aucun quiz
          </h2>

          <button
            className={styles.button}
            type='button'
            title='Créer un nouveau quiz'
            aria-label='Créer un nouveau quiz'
            onClick={() => router.push('/quizz/create')}
          >
            Créer un quiz
          </button>
        </section>
      :
        <section className={styles.container}>
          <UserQuizz
            quizz={userQuizz}
            userLogged={userLogged}
            getQuizzFromUser={getQuizzFromUser}
            setShowLoader={setShowLoader}
          />
        </section>
      }
    </>
  );
};

export default Profile;