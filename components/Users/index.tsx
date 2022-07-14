import User from '../User';
import styles from './Users.module.scss';

type UsersProps = {
  users: any,
  banUser: Function,
  unBanUser: Function,
  deleteUser: Function
};

const Users = ({
  users,
  banUser,
  unBanUser,
  deleteUser
} : UsersProps ) => {

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        {users === [] ? '' : 'Utilisateurs actifs'}
      </h3>

      <ul>
        {users?.map(({id, pseudo, email, avatar, is_admin, is_banished}: any) => {
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

export default Users;