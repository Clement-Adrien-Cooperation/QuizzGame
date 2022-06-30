import styles from './User.module.scss';

const User = ({
  id,
  pseudo,
  email,
  avatar,
  is_admin,
  is_banished,
  unbanUser,
  banUser
}: {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean,
  unbanUser: Function,
  banUser: Function
}) => {


  return (
    <div className={styles.card}>
      <h3 className={styles.pseudo}>
        {pseudo}
      </h3>

      <button
        className={styles.button}
        onClick={() => is_banished ? unbanUser(id) : banUser(id)}
      >
        {is_banished ? "Débannir" : "Bannir"}
      </button>
    </div>
  );
};

export default User;