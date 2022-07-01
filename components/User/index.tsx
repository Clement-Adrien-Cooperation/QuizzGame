import styles from './User.module.scss';

const User = ({
  id,
  pseudo,
  email,
  avatar,
  is_admin,
  is_banished,
  unBanUser,
  banUser
}: {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean,
  banUser: Function
  unBanUser: Function,
}) => {


  return (
    <div className={styles.card}>
      <h3 className={styles.pseudo}>
        {pseudo}
      </h3>

      <button
        className={styles.button}
        onClick={() => is_banished ? unBanUser(id) : banUser(id)}
      >
        {is_banished ? "Débannir" : "Bannir"}
      </button>
    </div>
  );
};

export default User;