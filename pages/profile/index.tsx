import { Quiz, User } from '@prisma/client';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import EditUser from '../../components/EditUser/EditUser';
import UserQuizCard from '../../components/UserQuizCard/UserQuizCard';
import Warning from '../../components/Warning/Warning';
import styles from '../../styles/Profile.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  handleDisconnect: () => void
};

const Profile: NextPage<Props> = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  handleDisconnect
}) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<Quiz[]>([]);
  
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else {

        document.title = "Mon profil - s'Quizz Game";
        getQuizzFromUser();
      };
    } else {
      router.push('/');
    };
  }, []);

  const getQuizzFromUser = async() => {

    await fetch('/api/quiz/getUserQuizz', {
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

  const handleDeleteUser = async () => {
    
    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`/api/user/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ user_id: userLogged.id })
    })
    .then(async(res) => {

      if(res.status === 200) {

        handleDisconnect();

      } else {
        setWarningMessage('Une erreur est survenue. Réessayez ou contactez-nous');
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Ma page de profil
        </h1>

        {!updateProfile && (
          <button
            className={styles.update}
            type='button'
            title={updateProfile ? "Ouvrir le formulaire de modification du profil" : "Fermer le formulaire de modification du profil"}
            aria-label={updateProfile ? "Ouvrir le formulaire de modification du profil" : "Fermer le formulaire de modification du profil"}
            onClick={() => setUpdateProfile(!updateProfile)}
          >
            {updateProfile ? "Fermer mes informations" : "Modifier mes informations"}
          </button>
        )}
      </header>

      <div className={styles.container}>
        <section
          className={updateProfile ?
            `${styles.infos} ${styles.opened}`
          :
            `${styles.infos}`
          }
        >
          <h2 className={styles.infos__title}>
            Modifier mon profil
          </h2>

          <EditUser
            isLogged={isLogged}
            userLogged={userLogged}
            setIsLogged={setIsLogged}
            setUserLogged={setUserLogged}
            setShowLoader={setShowLoader}
          />

          <button
            className={styles.cancel}
            type='button'
            title="Fermer le formulaire de modification du profil"
            aria-label="Fermer le formulaire de modification du profil"
            onClick={() => setUpdateProfile(!updateProfile)}
          >
            Annuler
          </button>

          <button
            className={styles.delete}
            type='button'
            title='Supprimer définitivement mon compte'
            aria-label='Supprimer définitivement mon compte'
            onClick={() => setShowConfirmDelete(true)}
          >
            Supprimer mon compte
          </button>

          {warningMessage && (
            <Warning
              warningMessage={warningMessage}
              setWarningMessage={setWarningMessage}
            />
          )}
        </section>
      </div>

      {userQuizz?.length === 0 ? (

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

      ) : (

        <section className={styles.container}>
          <h2 className={styles.container__title}>
            Mes Quizz
          </h2>

          <ul className={styles.list}>

            {userQuizz?.map((quiz: Quiz) =>

              <li key={uuidv4()}>
                <UserQuizCard
                  quiz={quiz}
                  getQuizzFromUser={getQuizzFromUser}
                  setShowLoader={setShowLoader}
                />
              </li>
            )}
          </ul>
        </section>
      )}

      {showConfirmDelete && (
        <ConfirmModal
          message={'Êtes vous certain de vouloir supprimer votre compte ?'}
          text={'Tous les quizz et les questions liées, ainsi que tous vos commentaires seront supprimés définitivement.'}
          handleFunction={handleDeleteUser}
          closeModal={() => setShowConfirmDelete(false)}
        />
      )}
    </>
  );
};

export default Profile;