import type { NextPage } from 'next';
import styles from '../styles/Admin.module.scss';
import Users from '../components/Users';
import User from '../components/User';


interface user {
  id: number,
  pseudo: string,
  email: string,
  password: string,
  avatar?: string | null,
  is_admin: boolean,
  is_banished: boolean
};

const Admin: NextPage = ({ users }) => {

  const deleteUser = async (user_id: number) => {

    const body = { user_id };

    await fetch(`/api/deleteUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
  };

  console.table(users);
  
  return (
    <section className={styles.container}>
      <ul>
        {users?.map((user) => {
          return (
            <li key={user.id}>
              <User
                id={user.id}
                pseudo={user.pseudo}
                email={user.email}
                avatar={user.avatar}
                is_admin={user.is_admin}
                is_banished={user.is_banished}
                deleteUser={deleteUser}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Admin;

export async function getStaticProps() {

  const data = await fetch('http://localhost:3000/api/getAllUsers');

  const users = await data.json();

  return {
    props: {
      users
    }
  };
};