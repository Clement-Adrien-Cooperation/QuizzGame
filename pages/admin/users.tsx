import { NextPage } from 'next';
import { useRouter } from 'next/router';
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

const AdminUsers: NextPage = ({ usersData, banishedUsersData, userLogged } :any) => {

  const router = useRouter();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [banishedUsers, setBanishedUsers] = useState<UserProps[]>([]);

  useEffect(() => {

    document.title = "Modérer les utilisateurs - s'Quizz Game";
    
    // If user is not admin, we redirect him to home page
    if(userLogged?.is_admin === true) {
      setUsers(usersData);
      setBanishedUsers(banishedUsersData);
    } else {
      router.push('/');
    };
  }, []);

  const getUsers = async() => {
    // Get users & banished users, then update states
    const usersDataFromAPI = await fetch('/api/user/getAll');
    const usersData = await usersDataFromAPI.json();
    setUsers(usersData);

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

      <section className={styles.buttons}>
        <a
          className={styles.button}
          href='#users'
        >
          Utilisateurs
        </a>

        <a
          className={styles.button}
          href='#banned-users'
        >
          Bannis
        </a>
      </section>
      
      <section className={styles.container}>
        <div id='users'>
          <Users
            users={users}
            userLogged={userLogged}
            handleBanishement={handleBanishement}
            handlePromotion={handlePromotion}
          />
        </div>

        <div id='banned-users'>
          <BanishedUsers
            banishedUsers={banishedUsers}
            userLogged={userLogged}
            handleBanishement={handleBanishement}
            handlePromotion={handlePromotion}
          />
        </div>
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