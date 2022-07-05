import User from '../User';
import styles from './BanishedUsers.module.scss';

const BanishedUsers = ({ banishedUsers, banUser, unBanUser, deleteUser }:any) => {

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        {banishedUsers === [] ? '' : 'Utilisateurs bannis'}
      </h3>

      <ul>
        {banishedUsers?.map(({id, pseudo, email, avatar, is_admin, is_banished}: any) => {
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