import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../../api/api';
import Image from 'next/image';
import styles from './ReportedSubject.module.scss';
import mail from '../../../../public/icons/mail.svg';
import ban from '../../../../public/icons/ban.svg';
import unban from '../../../../public/icons/unban.svg';
import Loader from '../../../Loader/Loader';

type Props = {
  user: User
};

const ReportedUser: FunctionComponent<Props> = ({
  user
}) => {

  const [banned, setBanned] = useState<boolean>(user.is_banished);
  const [showLoader, setShowLoader] = useState<boolean>(false);

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
        <p>
          Adresse mail : {user.email}
        </p>
        <p>
          Administrateur : {user.is_admin ? '✅' : '❌'}
        </p>
        <p>
           Banni : {banned ? '✅' : '❌'}
        </p>
      </section>

      <footer>
        <button
          className={styles.button}
          type="button"
          title="Envoyer un message à cet utilisateur"
          aria-label="Envoyer un message à cet utilisateur"
          onClick={() => console.log('créer lenvoi de message')}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une enveloppe'
            src={mail}
          />
        </button>

        <button
          className={styles.button}
          type="button"
          title={banned ? "Débannir cet utilisateur" : "Bannir cet utilisateur"}
          aria-label={banned ? "Débannir cet utilisateur" : "Bannir cet utilisateur"}
          onClick={moderateUser}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une poubelle'
            src={banned ? unban : ban}
          />
        </button>
      </footer>

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportedUser;