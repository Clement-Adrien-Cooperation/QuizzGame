import User from '../User';
import styles from './Users.module.scss';

type UserProps = {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type UsersProps = {
  users: UserProps[],
  handleBanishement: Function,
  handlePromotion: Function
};

const Users = ({
  users,
  handleBanishement,
  handlePromotion
} : UsersProps ) => {

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        {users === [] ? '' : 'Utilisateurs actifs'}
      </h3>

      <ul>
        {users?.map(({id, pseudo, email, avatar, is_admin, is_banished}: UserProps) => {
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

export default Users;