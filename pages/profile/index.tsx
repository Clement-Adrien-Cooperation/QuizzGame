import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';
import EditUser from '../../components/EditUser/EditUser';
import Loader from '../../components/Loader/Loader';
import UserQuizCard from '../../components/UserQuizCard/UserQuizCard';
import styles from '../../styles/Profile.module.scss';

type QuizTypes = {
  id: string,
  user_id: string,
  creator: string,
  title: string,
  category: string,
  lang: string,
  difficulty: string,
  is_visible: boolean,
  date: string,
  reported?: boolean,
  reportMessage?: string
};

const Profile: NextPage = ({
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  checkToken
}: any) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<QuizTypes[]>([]);
  
  const [updateProfile, setUpdateProfile] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(true);
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.pseudo === router.query.slug) {

        document.title = "Mon profil - s'Quizz Game";
        getQuizzFromUser();

      } else {
        router.push('/');
      };
    } else {
      const token = localStorage.getItem('token');

      if(token) {
        checkToken(token);
      } else {
        router.push('/');
      };
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

    await fetch(`/api/user/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userLogged.id })
    })
    .then(() => {
      setIsLogged(false);
      router.push('/');
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
          />

          <button
            className={styles.delete}
            type='button'
            title='Supprimer définitivement mon compte'
            aria-label='Supprimer définitivement mon compte'
            onClick={() => setShowConfirmDelete(true)}
          >
            Supprimer mon compte
          </button>

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

            {userQuizz?.map(quiz =>

              <li key={quiz.id}>
                <UserQuizCard
                  id={quiz.id}
                  title={quiz.title}
                  category={quiz.category}
                  lang={quiz.lang}
                  difficulty={quiz.difficulty}
                  is_visible={quiz.is_visible}
                  date={quiz.date}
                  reported={quiz.reported}
                  reportMessage={quiz.reportMessage}
                  getQuizzFromUser={getQuizzFromUser}
                />
              </li>
            )}
          </ul>
        </section>
      )}

      {showLoader && (
        <Loader />
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