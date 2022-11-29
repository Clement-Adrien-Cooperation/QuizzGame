import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import styles from './UserDetails.module.scss';

import IconButton from '../../IconButton/IconButton';
import IconDowngrade from '../../Icons/IconDowngrade';
import IconPromote from '../../Icons/IconPromote';
import IconTrash from '../../Icons/IconTrash';
import IconUnban from '../../Icons/IconUnban';
import IconBan from '../../Icons/IconBan';
import IconMail from '../../Icons/IconMail';
import IconAvatar from '../../Icons/IconAvatar';

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

          <IconButton
            title={`Voir le profil de ${user.pseudo}`}
            handleFunction={() => router.push(`/profile/${user.pseudo}`)}
          >
            <IconAvatar />
          </IconButton>

          <IconButton
            title={`Envoyer un message à ${user.pseudo}`}
            handleFunction={() => setShowMessageForm(true)}
          >
            <IconMail />
          </IconButton>

          {!user.is_admin &&
            <IconButton
              title={user.is_banished ? `Débannir ${user.pseudo}` : `Bannir ${user.pseudo}`}
              handleFunction={() => handleBanishment(user.id, user.is_banished)}
            >
              {user.is_banished ? <IconUnban /> : <IconBan />}
            </IconButton>
          }

          {user.is_banished ?
            <IconButton
              title={`Supprimer le compte de ${user.pseudo} définitivement`}
              handleFunction={() => handleDeleteUser(user.id)}
            >
              <IconTrash />
            </IconButton>
          :
            <IconButton
              title={user.is_admin ? `Retirer les droits d'administrateurs à ${user.pseudo}` : `Donner les droits d'administration à ${user.pseudo}`}
              handleFunction={() => handlePromotion(user.id, user.is_admin)}
            >

              {user.is_admin ? <IconDowngrade /> : <IconPromote />}
            </IconButton>
          }
        </footer>
      }
    </section>
  );
};

export default UserDetails;