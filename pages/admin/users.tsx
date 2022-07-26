import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import styles from '../../styles/admin/AdminUsers.module.scss';
import Users from '../../components/Users/Users';
import BanishedUsers from '../../components/BanishedUsers/BanishedUsers';

type UserProps = {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

const AdminUsers: NextPage = ({ usersData, banishedUsersData } :any) => {

  const [users, setUsers] = useState<UserProps[]>([]);
  const [banishedUsers, setBanishedUsers] = useState<UserProps[]>([]);
  
  // A the moment we have our data, we update our states
  useEffect(() => {
    // if(userLogged.is_admin === false) {
    //   router.push('/');
    // } else {;
      setUsers(usersData);
      setBanishedUsers(banishedUsersData);
    // };
  },[]);

  const getUsers = async() => {
    const usersDataFromAPI = await fetch('/api/user/getAll');
    const usersData = await usersDataFromAPI.json();
    setUsers(usersData);
    
    // & we update the states
    const banishedUsersDataFromAPI = await fetch('/api/user/getBanishedUsers');
    const banishedUsersData = await banishedUsersDataFromAPI.json();
    setBanishedUsers(banishedUsersData);
  };

  // Function for bann a user
  const handleBanishement = async (user_id:number, is_banished :boolean) => {

    // Set up the body for the request with user ID & new status of bannishement
    const body = { user_id, is_banished };
  
    // Fetch our API
    await fetch(`/api/user/moderate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handlePromotion = async (user_id :number, is_admin :boolean) => {

    const body = { user_id, is_admin }

    await fetch('/api/user/promote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <AdminHeader />
      
      <section className={styles.container}>

        <Users
          users={users}
          handleBanishement={handleBanishement}
          handlePromotion={handlePromotion}
        />

        <BanishedUsers
          banishedUsers={banishedUsers}
          handleBanishement={handleBanishement}
          handlePromotion={handlePromotion}
        />
      </section>
    </>
  );
};

export default AdminUsers;

export async function getStaticProps() {

  // Get data from API for users & bannished users
  const usersDataFromAPI = await fetch('http://localhost:3000/api/user/getAll');
  const banishedUsersDataFromAPI = await fetch('http://localhost:3000/api/user/getBanishedUsers');

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