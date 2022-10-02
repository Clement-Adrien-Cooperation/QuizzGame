import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../../api/api';
import Image from 'next/image';
import styles from './ReportedSubject.module.scss';
import mail from '../../../../public/icons/mail.svg';
import ban from '../../../../public/icons/ban.svg';
import unban from '../../../../public/icons/unban.svg';
import eye from '../../../../public/icons/eye_visible.svg';
import Loader from '../../../Loader/Loader';
import Link from 'next/link';
import AdminMessage from '../../AdminMessage/AdminMessage';
import Message from '../../../Message/Message';
import Modal from '../../../Modal/Modal';
import ImageButton from '../../../ImageButton/ImageButton';

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
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt='Un oeil'
              src={eye}
            />
          </a>
        </Link>

        <ImageButton
          title={`Envoyer un message à ${user.pseudo}`}
          img={mail}
          alt={'Une enveloppe'}
          handleFunction={() => setShowMessage(true)}
        />

        <ImageButton
          title={banned ? `Débannir ${user.pseudo}` : `Bannir ${user.pseudo} de s'Quizz Game`}
          img={banned ? unban : ban}
          alt={banned ? "Une flèche qui rentre dans un carré" : "Une flèche qui sort d'un carré"}
          handleFunction={moderateUser}
        />
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