import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../api/api';
import EditUser from '../EditUser/EditUser';
import styles from './UserInfos.module.scss';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import Warning from '../Warning/Warning';

type Props = {
  updateProfile: boolean,
  isLogged: boolean,
  userLogged: User,
  setIsLogged: Dispatch<SetStateAction<boolean>>,
  setUserLogged: Dispatch<SetStateAction<User>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setUpdateProfile: Dispatch<SetStateAction<boolean>>,
  handleDisconnect: () => void
};

const UserInfos: FunctionComponent<Props> = ({
  updateProfile,
  isLogged,
  userLogged,
  setIsLogged,
  setUserLogged,
  setShowLoader,
  setUpdateProfile,
  handleDisconnect
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  const handleDeleteUser = async () => {

    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/user/delete`, {
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

      {showConfirmDelete &&
        <ConfirmModal
          message={'Êtes vous certain de vouloir supprimer votre compte ?'}
          text={'Tous les quizz et les questions liées, ainsi que tous vos commentaires seront supprimés définitivement.'}
          handleFunction={handleDeleteUser}
          closeModal={() => setShowConfirmDelete(false)}
        />
      }
    </>
  );
};

export default UserInfos;