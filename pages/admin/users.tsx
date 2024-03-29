import type { Dispatch, SetStateAction } from 'react';
import type { NextPage } from 'next';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';

import styles from '../../styles/admin/AdminUsers.module.scss';

import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import AdminUsers from '../../components/Admin/AdminUsers/AdminUsers';
import BanishedUsers from '../../components/Admin/BanishedUsers/BanishedUsers';
import AdminMessage from '../../components/Admin/AdminMessage/AdminMessage';
import Message from '../../components/Message/Message';

import IconButton from '../../components/IconButton/IconButton';
import IconMail from '../../public/Icons/IconMail';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Users: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader,
  setPageTitle
}) => {

  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [banishedUsers, setBanishedUsers] = useState<User[]>([]);

  const [message, setMessage] = useState<string>('');
  const [showMessageForm, setShowMessageForm] = useState<boolean>(false);

  useEffect(() => {
    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        setPageTitle("Modérer les utilisateurs - s'Quizz Game");
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
    await fetch(`${api}/user/getUsers`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const usersData = await res.json();
      setUsers(usersData);
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
      const banishedUsersData = await res.json();
      setBanishedUsers(banishedUsersData);
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const handlePromotion = async (user_id: string, is_admin: boolean, index: number) => {

    setShowLoader(true);

    const token = localStorage.getItem('token');

    await fetch(`${api}/user/promote`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id, is_admin })
    })
    .then((res) => {
      if(res.status === 200) {
        const userTargeted = users[index];
        userTargeted.is_admin = is_admin ? false : true;
        setMessage(is_admin ? "✅ L'utilisateur a bien été rétrogradé" : "✅ L'utilisateur a bien été promu");
      } else {
        setMessage('❌ Une erreur est survenue');
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const handleBanishment = async (user_id: string, is_banished: boolean, index: number) => {

    setShowLoader(true);
    const token = localStorage.getItem('token');

    // Fetch our API
    await fetch(`${api}/user/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id, is_banished })
    })
    .then((res) => {
      if(res.status === 200) {
        if(is_banished) {
          const targetedUser = banishedUsers[index];
          targetedUser.is_banished = false;
          setUsers([...users, targetedUser]);

          const newBanishedUsers = [...banishedUsers];
          newBanishedUsers.splice(index, 1);
          setBanishedUsers([...newBanishedUsers]);
        } else {
          const targetedUser = users[index];
          targetedUser.is_banished = true;
          setBanishedUsers([...banishedUsers, targetedUser]);

          const newUsers = [...users];
          newUsers.splice(index, 1);
          setUsers([...newUsers]);
        };

        setMessage(`✅ L'utilisateur a bien été ${is_banished ? "débanni" : "banni"}`);
      } else {
        setMessage('❌ Une erreur est survenue');
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const handleDeleteUser = async(user_id: string, index: number) => {
    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/user/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id })
    })
    .then(async(res) => {
      if(res.status === 200) {
        const previousUsers = [...banishedUsers];
        previousUsers.splice(index, 1);
        setBanishedUsers([...previousUsers]);
        setMessage("✅ L'utilisateur a bien été supprimé");
      } else {
        setMessage('❌ Une erreur est survenue');
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <>
      <AdminHeader />

      <section className={styles.buttons}>

        {users?.length > 0 &&
          <a
            className={styles.button}
            href='#users'
          >
            Utilisateurs
          </a>
        }

        {banishedUsers?.length > 0 &&
          <a
            className={styles.button}
            href='#banned-users'
          >
            Bannis
          </a>
        }

        <IconButton
          title="Envoyer un message à tous les utilisateurs"
          handleFunction={() => setShowMessageForm(true)}
        >
          <IconMail />
        </IconButton>
      </section>

      <section className={styles.container}>
        <div id='users'>
          <AdminUsers
            users={users}
            userLogged={userLogged}
            handlePromotion={handlePromotion}
            handleBanishment={handleBanishment}
            handleDeleteUser={handleDeleteUser}
          />
        </div>

        <div id='banned-users'>
          <BanishedUsers
            banishedUsers={banishedUsers}
            userLogged={userLogged}
            handlePromotion={handlePromotion}
            handleBanishment={handleBanishment}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      </section>

      {showMessageForm &&
        <AdminMessage
          recipient='tous les utilisateurs'
          userID=''
          setNotification={setMessage}
          setShowMessageForm={setShowMessageForm}
        />
      }

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }
    </>
  );
};

export default Users;