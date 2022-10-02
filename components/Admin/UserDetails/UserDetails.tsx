import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { User } from '@prisma/client';
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

type Props = {
  user: User,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void,
  handleDeleteUser: (user_id: string) => void,
  setShowMessageForm: Dispatch<SetStateAction<boolean>>
};

const UserDetails: FunctionComponent<Props> = ({
  user,
  userLogged,
  handlePromotion,
  handleBanishment,
  handleDeleteUser,
  setShowMessageForm
}) => {

  const router = useRouter();

  return (
    <section className={styles.details}>
      {userLogged.id === user.id ?

        <footer className={styles.footer}>
          <p className={styles.text}>
            Vous ne pouvez pas vous administrer vous-même
          </p>
        </footer>
      :
        <footer className={styles.footer}>

          <ImageButton
            title={`Voir le profil de ${user.pseudo}`}
            img={avatar}
            alt={"Bonhomme dessiné"}
            handleFunction={() => router.push(`/profile/${user.pseudo}`)}
          />

          <ImageButton
            title={`Envoyer un message à ${user.pseudo}`}
            img={mail}
            alt={"Une enveloppe"}
            handleFunction={() => setShowMessageForm(true)}
          />

          {!user.is_admin &&
            <ImageButton
              title={user.is_banished ? `Débannir ${user.pseudo}` : `Bannir ${user.pseudo}`}
              img={user.is_banished ? unban : ban}
              alt={user.is_banished ? "Port avec une flèche qui rentre dedans" : "Porte avec une flèche qui en sort"}
              handleFunction={() => handleBanishment(user.id, user.is_banished)}
            />
          }

          {user.is_banished ?
            <ImageButton
              title={`Supprimer le compte de ${user.pseudo} définitivement`}
              img={trash}
              alt={"Une poubelle"}
              handleFunction={() => handleDeleteUser(user.id)}
            />
          :
            <ImageButton
              title={user.is_admin ? `Retirer les droits d'administrateurs à ${user.pseudo}` : `Donner les droits d'administration à ${user.pseudo}`}
              img={user.is_admin ? downgrade : promote}
              alt={user.is_admin ? "Bonhomme avec un sigle moins" : "Bonhomme avec un sigle moins"}
              handleFunction={() => handlePromotion(user.id, user.is_admin)}
            />
          }
        </footer>
      }
    </section>
  );
};

export default UserDetails;