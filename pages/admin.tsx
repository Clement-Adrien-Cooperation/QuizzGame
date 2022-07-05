import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import styles from '../styles/Admin.module.scss';
import Users from '../components/Users';
import BanishedUsers from '../components/BanishedUsers';

const Admin: NextPage = ({ usersData, banishedUsersData }:any) => {

  const [users, setUsers] = useState([]);
  const [banishedUsers, setBanishedUsers] = useState([]);
  
  // A the moment we have our data, we update our states
  useEffect(() => {
    setUsers(usersData);
    setBanishedUsers(banishedUsersData);
  },[]);

  // Function for bann a user
  const banUser = async (user_id: number) => {

    // Set up the body for the request with user ID & new status of bannishement
    const body = { 
      user_id,
      is_banished: true
    };
  
    // Fetch our API
    await fetch(`/api/banUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async() => {
      // Then, we fetch again our API to get users & bannished users
      const usersDataFromAPI = await fetch('/api/getAllUsers');
      const usersData = await usersDataFromAPI.json();
      setUsers(usersData);
      
      // & we update the states
      const banishedUsersDataFromAPI = await fetch('/api/getBanishedUsers');
      const banishedUsersData = await banishedUsersDataFromAPI.json();
      setBanishedUsers(banishedUsersData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Same function, but for unban a user
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
      const usersDataFromAPI = await fetch('/api/getAllUsers');
      const usersData = await usersDataFromAPI.json();
      setUsers(usersData);

      const banishedUsersDataFromAPI = await fetch('/api/getBanishedUsers');
      const banishedUsersData = await banishedUsersDataFromAPI.json();
      setBanishedUsers(banishedUsersData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteUser = async (user_id: number) => {
    
    const body = { user_id };
  
    await fetch(`/api/deleteUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async() => {
      const usersDataFromAPI = await fetch('/api/getAllUsers');
      const usersData = await usersDataFromAPI.json();
      setUsers(usersData);

      const banishedUsersDataFromAPI = await fetch('/api/getBanishedUsers');
      const banishedUsersData = await banishedUsersDataFromAPI.json();
      setBanishedUsers(banishedUsersData);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <section className={styles.admin}>
      <h2 className={styles.title}>
        Administration
      </h2>

      <section className={styles.container}>

        <Users
          users={users}
          banUser={banUser}
          unBanUser={unBanUser}
          deleteUser={deleteUser}
        />

        <BanishedUsers
          banishedUsers={banishedUsers}
          banUser={banUser}
          unBanUser={unBanUser}
          deleteUser={deleteUser}
        />

      </section>
    </section>
  );
};

export default Admin;

export async function getStaticProps() {

  // Get data from API for users & bannished users
  const usersDataFromAPI = await fetch('http://localhost:3000/api/getAllUsers');
  const banishedUsersDataFromAPI = await fetch('http://localhost:3000/api/getBanishedUsers');

  // Translate to JSON
  const usersData = await usersDataFromAPI.json();
  const banishedUsersData = await banishedUsersDataFromAPI.json();

  // We return those props & using it in the states
  return {
    props: {
      usersData,
      banishedUsersData
    }
  };
};