import type { NextPage } from 'next';
import styles from '../styles/Admin.module.scss';
import Users from '../components/Users';
import User from '../components/User';
import { useEffect, useState } from 'react';

type Props = {
  usersData: {
    id: number,
    pseudo: string,
    email: string,
    password: string,
    avatar?: string | null,
    is_admin: boolean,
    is_banished: boolean
  };
};

const Admin: NextPage<Props> = ({usersData}:any) => {

  const [users, setUsers] = useState([]);
  console.log(users)

  useEffect(() => {
    setUsers(usersData);
  },[]);

  const banUser = async (user_id: number) => {

    const body = { 
      user_id,
      is_banished: true
    };
  
    await fetch(`/api/banUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async() => {
      const data = await fetch('/api/getAllUsers');
      const usersData = await data.json();
      setUsers(usersData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const unBanUser = async (user_id: number) => {

    const body = {
      user_id,
      is_banished: false
    };
  
    await fetch(`/api/banUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async() => {
      const data = await fetch('/api/getAllUsers');
      const usersData = await data.json();
      setUsers(usersData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

 

  return (
    <section className={styles.container}>
      <h2>
        Administration
      </h2>
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
                unbanUser={unBanUser}
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

  const usersData = await data.json();

  console.log(usersData)
  return {
    props: {
      usersData
    }
  };
};