import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import styles from './UserDetails.module.scss';

import IconButton from '../../IconButton/IconButton';
import IconDowngrade from '../../../public/Icons/IconDowngrade';
import IconPromote from '../../../public/Icons/IconPromote';
import IconTrash from '../../../public/Icons/IconTrash';
import IconUnban from '../../../public/Icons/IconUnban';
import IconBan from '../../../public/Icons/IconBan';
import IconMail from '../../../public/Icons/IconMail';
import IconAvatar from '../../../public/Icons/IconAvatar';

type Props = {
  user: User,
  index: number,
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean, index: number) => void,
  handleBanishment: (user_id: string, is_banished: boolean, index: number) => void,
  handleDeleteUser: (user_id: string, index: number) => void,
  setShowMessageForm: Dispatch<SetStateAction<boolean>>
};

const UserDetails: FunctionComponent<Props> = ({
  user,
  index,
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
              handleFunction={() => handleBanishment(user.id, user.is_banished, index)}
            >
              {user.is_banished ? <IconUnban /> : <IconBan />}
            </IconButton>
          }

          {user.is_banished ?
            <IconButton
              title={`Supprimer le compte de ${user.pseudo} définitivement`}
              handleFunction={() => handleDeleteUser(user.id, index)}
            >
              <IconTrash />
            </IconButton>
          :
            <IconButton
              title={user.is_admin ? `Retirer les droits d'administrateurs à ${user.pseudo}` : `Donner les droits d'administration à ${user.pseudo}`}
              handleFunction={() => handlePromotion(user.id, user.is_admin, index)}
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