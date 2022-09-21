import { User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { api } from '../../api/api';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import styles from '../../styles/admin/AdminUsers.module.scss';
import AdminUsers from '../../components/Admin/AdminUsers/AdminUsers';
import BanishedUsers from '../../components/Admin/BanishedUsers/BanishedUsers';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Users: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader
}) => {

  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [banishedUsers, setBanishedUsers] = useState<User[]>([]);
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        document.title = "Modérer les utilisateurs - s'Quizz Game";
        getUsers();

      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getUsers = async() => {

    setShowLoader(true);

    // Get token from local storage for make sur this is an admin
    const token = localStorage.getItem('token');

    // Get users & banished users, then update states
    await fetch(`${api}/user/getAll`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
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

    await fetch(`${api}/user/getBanishedUsers`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const banishedUsersDataFromAPI = await res.json();
      setBanishedUsers(banishedUsersDataFromAPI);
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const handlePromotion = async (user_id: string, is_admin: boolean) => {

    setShowLoader(true);

    const token = localStorage.getItem('token');
    const body = { user_id, is_admin }

    await fetch(`${api}/user/promote`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async() => {
      getUsers();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  // Function for bann a user
  const handleBanishment = async (user_id: string, is_banished: boolean) => {

    setShowLoader(true);

    // Set up the body for the request with user ID & new status of bannishement
    const body = { user_id, is_banished };
    const token = localStorage.getItem('token');
  
    // Fetch our API
    await fetch(`${api}/user/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
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

        {users.length !== 0 &&
          <a
            className={styles.button}
            href='#users'
          >
            Utilisateurs
          </a>
        }

        {banishedUsers.length !== 0 &&
          <a
            className={styles.button}
            href='#banned-users'
          >
            Bannis
          </a>
        }
      </section>
      
      <section className={styles.container}>
        <div id='users'>
          <AdminUsers
            users={users}
            userLogged={userLogged}
            handlePromotion={handlePromotion}
            handleBanishment={handleBanishment}
          />
        </div>

        <div id='banned-users'>
          <BanishedUsers
            banishedUsers={banishedUsers}
            userLogged={userLogged}
            handlePromotion={handlePromotion}
            handleBanishment={handleBanishment}
          />
        </div>
      </section>
    </>
  );
};

export default Users;