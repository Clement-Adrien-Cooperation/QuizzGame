import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import styles from '../../styles/admin/AdminUsers.module.scss';
import Users from '../../components/Users/Users';
import BanishedUsers from '../../components/BanishedUsers/BanishedUsers';
import Loader from '../../components/Loader/Loader';

type UserProps = {
  id: string,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

const AdminUsers: NextPage = ({ isLogged, userLogged, usersData, banishedUsersData } :any) => {

  const router = useRouter();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [banishedUsers, setBanishedUsers] = useState<UserProps[]>([]);

  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    // If user is not admin, we redirect him to home page
    if(isLogged) {
      if(userLogged?.is_admin === true) {
        document.title = "Modérer les utilisateurs - s'Quizz Game";
        setUsers(usersData);
        setBanishedUsers(banishedUsersData);
        setShowLoader(false);
      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getUsers = async() => {

    // Get users & banished users, then update states
    await fetch('/api/user/getAll')
    .then(async(res) => {
      const usersDataFromAPI = await res.json();
      setUsers(usersDataFromAPI);
    })
    .then(() => {
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });

    await fetch('/api/user/getBanishedUsers')
    .then(async(res) => {
      const banishedUsersDataFromAPI = await res.json();
      setBanishedUsers(banishedUsersDataFromAPI);
    })
    .then(() => {
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Function for bann a user
  const handleBanishement = async (user_id:number, is_banished :boolean) => {

    setShowLoader(true);

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

    setShowLoader(true);

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

        {users.length === 0 ? '' : (
          <a
            className={styles.button}
            href='#users'
          >
            Utilisateurs
          </a>
        )}

        {banishedUsers.length === 0 ? '' : (
          <a
            className={styles.button}
            href='#banned-users'
          >
            Bannis
          </a>
        )}
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

      {showLoader && (
        <Loader />
      )}
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