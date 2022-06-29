import styles from './User.module.scss';

const User = ({
  id,
  pseudo,
  email,
  avatar,
  is_admin,
  is_banished,
  deleteUser
}: {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean,
  // deleteUser: (id: number)
}) => {

  return (
    <div className={styles.card}>
      <h3 className={styles.pseudo}>
        {pseudo}
      </h3>

      <button
        className={styles.button}
        onClick={() => deleteUser(id)}
      >
        Supprimer
      </button>
    </div>
  );
};

export default User;