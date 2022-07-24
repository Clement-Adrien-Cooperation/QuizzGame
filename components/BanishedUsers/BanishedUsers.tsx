import handle from '../../pages/api/banUser';
import User from '../User/User';
import styles from './BanishedUsers.module.scss';

type UserProps = {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type BanishedUsersProps = {
  banishedUsers: UserProps[],
  handleBanishement: Function,
  handlePromotion: Function
};

const BanishedUsers = ({ 
  banishedUsers,
  handleBanishement,
  handlePromotion
} : BanishedUsersProps ) => {

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        {banishedUsers === [] ? '' : 'Utilisateurs bannis'}
      </h3>

      <ul>
        {banishedUsers?.map(({id, pseudo, email, avatar, is_admin, is_banished}: UserProps) => {
          return (
            <li key={id}>
              <User
                id={id}
                pseudo={pseudo}
                email={email}
                avatar={avatar}
                is_admin={is_admin}
                is_banished={is_banished}
                handleBanishement={handleBanishement}
                handlePromotion={handlePromotion}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BanishedUsers;