import styles from './Users.module.scss';

const UsersView = ({ users }) => {

  console.table(users);

  return (
    <section className={styles.container}>
      <ul>
        {users?.map((user) => {
          <li>
            {user.pseudo}
          </li>
        })}
      </ul>
    </section>
  );
};

export default UsersView;

export async function getStaticProps() {

  const data = await fetch('http://localhost:3000/api/getAllUsers');

  const users = await data.json();

  return {
    props: {
      users
    }
  };
};