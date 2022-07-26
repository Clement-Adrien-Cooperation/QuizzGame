import User from '../User/User';
import styles from './Users.module.scss';

type UserTypes = {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type UserLoggedTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean
};

type UsersProps = {
  users: UserTypes[],
  handleBanishement: Function,
  handlePromotion: Function,
  userLogged: UserLoggedTypes
};

const Users = ({
  users,
  handleBanishement,
  handlePromotion,
  userLogged
} : UsersProps ) => {

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        {users === [] ? '' : 'Utilisateurs actifs'}
      </h3>

      <ul>
        {users?.map(({id, pseudo, email, avatar, is_admin, is_banished}: UserTypes) => {
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
                userLogged={userLogged}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Users;