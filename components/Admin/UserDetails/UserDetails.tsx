import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './UserDetails.module.scss';
import ImageButton from '../../ImageButton/ImageButton';
import avatar from '../../../public/icons/defaultAvatar.svg';
import promote from '../../../public/icons/promote.svg';
import downgrade from '../../../public/icons/downgrade.svg';
import ban from '../../../public/icons/ban.svg';
import unban from '../../../public/icons/unban.svg';
import trash from '../../../public/icons/delete.svg';
import mail from '../../../public/icons/mail.svg';
import AdminMessage from '../AdminMessage/AdminMessage';
import Message from '../../Message/Message';

type Props = {
  id: string,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void
  handleDeleteUser: (user_id: string) => void
};

const UserDetails: FunctionComponent<Props> = ({
  id,
  pseudo,
  is_banished,
  is_admin,
  userLogged,
  handlePromotion,
  handleBanishment,
  handleDeleteUser
}) => {

  const router = useRouter();

  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  return (
    <>
      <section className={styles.details}>
      {userLogged.id === id ?

        <div className={styles.footer}>
          <p className={styles.text}>
            Vous ne pouvez pas vous administrer vous-même
          </p>
        </div>
      :
        <div className={styles.footer}>

          <ImageButton
            title={`Voir le profil de ${pseudo}`}
            img={avatar}
            alt={"Bonhomme dessiné"}
            handleFunction={() => router.push(`/profile/${pseudo}`)}
          />

          <ImageButton
            title={`Envoyer un message à ${pseudo}`}
            img={mail}
            alt={"Une enveloppe"}
            handleFunction={() => setShowMessageForm(true)}
          />

          {!is_admin &&
            <ImageButton
              title={is_banished ? `Débannir ${pseudo}` : `Bannir ${pseudo}`}
              img={is_banished ? unban : ban}
              alt={is_banished ? "Port avec une flèche qui rentre dedans" : "Porte avec une flèche qui en sort"}
              handleFunction={() => handleBanishment(id, is_banished)}
            />
          }

          {is_banished ?
            <ImageButton
              title={`Supprimer le compte de ${pseudo} définitivement`}
              img={trash}
              alt={"Une poubelle"}
              handleFunction={() => handleDeleteUser(id)}
            />
          :
            <ImageButton
              title={is_admin ? `Retirer les droits d'administrateurs à ${pseudo}` : `Donner les droits d'administration à ${pseudo}`}
              img={is_admin ? downgrade : promote}
              alt={is_admin ? "Bonhomme avec un sigle moins" : "Bonhomme avec un sigle moins"}
              handleFunction={() => handlePromotion(id, is_admin)}
            />
          }
        </div>
      }
      </section>

      {showMessageForm &&
        <AdminMessage
          recipient={pseudo}
          userID={id}
          setNotification={setMessage}
          setShowMessageForm={setShowMessageForm}
        />
      }

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }
    </>

  );
};

export default UserDetails;