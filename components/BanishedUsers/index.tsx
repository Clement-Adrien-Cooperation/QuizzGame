import User from '../User';
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
  banUser: Function,
  unBanUser: Function,
  deleteUser: Function
};

const BanishedUsers = ({ 
  banishedUsers,
  banUser,
  unBanUser,
  deleteUser
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
                banUser={banUser}
                unBanUser={unBanUser}
                deleteUser={deleteUser}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default BanishedUsers;