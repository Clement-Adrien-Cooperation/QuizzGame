import type { AppProps } from 'next/app';
import { Notification, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../api/api';
import Container from '../components/Container/Container';
import Loader from '../components/Loader/Loader';
import '../styles/reset.css';
import '../styles/globals.scss';

const unLoggedUser: User = {
  id: '',
  pseudo: '',
  email: '',
  password: '',
  is_admin: false,
  is_banished: false
};

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<User>(unLoggedUser);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [nbOfNotifications, setNbOfNotifications] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      checkToken(token);
    };
  }, []);

  useEffect(() => {
    if(isLogged) {
      getUserNotifications();
    };
  }, [isLogged]);

  const checkToken = async (token: string) => {

    setShowLoader(true);

    await fetch(`${api}/user/checkToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const userData = await res.json();

      if(res.status === 200) {

        setUserLogged(userData);
        setIsLogged(true);

        if(userData.is_banished) {
          router.push('/banned');
        };
      } else {
        console.log(userData);
        handleDisconnect();
      };
    })
    .catch((error) => {
      console.log(error);
      handleDisconnect();
    });

    setShowLoader(false);
  };

  const handleDisconnect = () => {

    localStorage.removeItem('token');

    setIsLogged(false);
    setUserLogged(unLoggedUser);

    router.reload();
  };

  const getUserNotifications = async() => {
    // Get token from local storage
    const token = localStorage.getItem('token');

    await fetch(`${api}/notification/getAllFromUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id: userLogged.id })
    })
    .then(async(res) => {
      if(res.status === 200) {
        const data = await res.json();
        setNotifications(data);
        countNotifications(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const countNotifications = (notifications: Notification[]) => {
    let nb = 0;

    notifications.forEach(notification => {
      if(notification.seen === false) {
        nb++
      };
    });

    setNbOfNotifications(nb);
  };

  return (
    <Container
      isLogged={isLogged}
      userLogged={userLogged}
      handleDisconnect={handleDisconnect}
      notifications={notifications}
      nbOfNotifications={nbOfNotifications}
      setNbOfNotifications={setNbOfNotifications}
    >
      <Component
        {...pageProps}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        userLogged={userLogged}
        setUserLogged={setUserLogged}
        handleDisconnect={handleDisconnect}
        setShowLoader={setShowLoader}
      />

      {showLoader && (
        <Loader />
      )}
    </Container>
  );
};

export default MyApp;