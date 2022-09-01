import '../styles/reset.css';
import '../styles/globals.scss';
import Container from '../components/Container/Container';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';

const unLoggedUser: User = {
  id: '',
  pseudo: '',
  email: '',
  password: '',
  is_admin: false,
  is_banished: false,
  reported: false,
  reportMessage: []
};

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<User>(unLoggedUser);

  const checkToken = async (token: string) => {

    await fetch('/api/user/checkToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 200) {

        if(data.is_banished) {
          router.push('/banned');
        } else {

          setUserLogged(data);
          setIsLogged(true);
        };
      } else if(res.status === 401) {
        console.error(data.message);
        handleDisconnect();
      } else {
        console.error(data);
        handleDisconnect();
      };
    })
    .catch((error) => {
      console.log(error);
      handleDisconnect();
    });
  };

  const handleDisconnect = () => {

    localStorage.removeItem('token');

    setIsLogged(false);
    setUserLogged(unLoggedUser);

    router.push('/');
  };

  return (
    <Container
      isLogged={isLogged}
      userLogged={userLogged}
      handleDisconnect={handleDisconnect}
    >
      <Component
        {...pageProps}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        userLogged={userLogged}
        setUserLogged={setUserLogged}
        handleDisconnect={handleDisconnect}
        checkToken={checkToken}
      />
    </Container>
  );
};

export default MyApp;