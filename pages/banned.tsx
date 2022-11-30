import type { NextPage } from 'next';
import type { Dispatch, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../api/api';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import ContactForm from '../components/ContactForm/ContactForm';
import styles from '../styles/Banned.module.scss';
import Warning from '../components/Warning/Warning';

type Props = {
  userLogged: User,
  isLogged: boolean,
  handleDisconnect: () => void,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>
}

const Banned: NextPage<Props> = ({
  userLogged,
  isLogged,
  handleDisconnect,
  setShowLoader,
  setPageTitle
}) => {

  const router = useRouter();

  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  useEffect(() => {
    if(isLogged) {
      if(!userLogged.is_banished) {
        router.push('/');
      } else {
        setPageTitle("Banni");
      };
    } else {
      router.push('/');
    };
  }, []);

  const handleDeleteUser = async() => {
    setShowLoader(true);
    setWarningMessage('');
    setShowConfirmDelete(false);

    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // Delete the right user from database
    await fetch(`${api}/user/deleteBanishedUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ user_id: userLogged.id })
    })
    .then(async(res) => {
      // If API send us "OK", the user is deleted
      if(res.status === 200) {
        // Disconnect user
        handleDisconnect();
      } else {
        // if not, set the warning message
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
      <div className={styles.container}>

        <h1 className={styles.title}>
          Vous avez été banni
        </h1>

        <p className={styles.message}>
          Si vous pensez que c'est une erreur, vous pouvez nous envoyer un message ci-dessous
        </p>

        <ContactForm />

        {warningMessage &&
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        }

        <button
          className={styles.delete}
          type="button"
          title="Supprimer définitivement mon compte"
          aria-label="Supprimer définitivement mon compte"
          onClick={() => setShowConfirmDelete(true)}
        >
          Supprimer mon compte
        </button>
      </div>

      {showConfirmDelete &&
        <ConfirmModal
          message={'Êtes vous certain de vouloir supprimer votre compte ?'}
          text={'Tous les quizz et les questions qui y sont liées, ainsi que tous vos commentaires seront supprimés définitivement.'}
          handleFunction={handleDeleteUser}
          closeModal={() => setShowConfirmDelete(false)}
        />
      }
    </>
  );
};

export default Banned;