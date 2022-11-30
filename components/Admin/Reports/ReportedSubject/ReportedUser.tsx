import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../../api/api';
import Link from 'next/link';

import styles from './ReportedSubject.module.scss';

import Loader from '../../../Loader/Loader';
import AdminMessage from '../../AdminMessage/AdminMessage';
import Message from '../../../Message/Message';
import Modal from '../../../Modal/Modal';

import IconBan from '../../../Icons/IconBan';
import IconButton from '../../../IconButton/IconButton';
import IconMail from '../../../Icons/IconMail';
import IconEye from '../../../Icons/IconEye';
import IconUnban from '../../../Icons/IconUnban';

type Props = {
  user: User
};

const ReportedUser: FunctionComponent<Props> = ({
  user
}) => {

  const [banned, setBanned] = useState<boolean>(user.is_banished);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const moderateUser = async() => {
    setShowLoader(true);

    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // We need user ID & "is_banished" column, to toggle it in API
    const body = {
      user_id: user.id,
      is_banished: user.is_banished
    };

    await fetch(`${api}/user/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        setBanned(!banned);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <>
      <section className={styles.details}>
        <p className={styles.info}>
          Administrateur : <span className={styles.content}>{user.is_admin ? '✅' : '❌'}</span>
        </p>

        <p className={styles.info}>
          Banni : <span className={styles.content}>{banned ? '✅' : '❌'}</span>
        </p>
      </section>

      <footer className={styles.footer}>
        <Link href={`/profile/${user.pseudo}`}>
          <a
            className={styles.button}
            title={`Voir le profil de ${user.pseudo}`}
            aria-label={`Voir le profil de ${user.pseudo}`}
          >
            <IconEye />
          </a>
        </Link>

        <IconButton
          title={`Envoyer un message à ${user.pseudo}`}
          handleFunction={() => setShowMessage(true)}
        >
          <IconMail />
        </IconButton>

        <IconButton
          title={banned ? `Débannir ${user.pseudo}` : `Bannir ${user.pseudo} de s'Quizz Game`}
          handleFunction={moderateUser}
        >
          {banned ? <IconUnban /> : <IconBan />}
        </IconButton>
      </footer>

      {showMessage &&
        <Modal
          setShowModal={setShowMessage}
        >
          <AdminMessage
            recipient={user.pseudo}
            userID={user.id}
            setNotification={setMessage}
            setShowMessageForm={setShowMessage}
          />
        </Modal>
      }

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportedUser;