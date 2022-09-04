import '../styles/reset.css';
import '../styles/globals.scss';
import Container from '../components/Container/Container';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import Loader from '../components/Loader/Loader';

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

  useEffect(() => {
    const token = localStorage.getItem('token');

    if(token) {
      checkToken(token);
    };
  }, []);

  const checkToken = async (token: string) => {

    setShowLoader(true);

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
      } else {
        console.log(data);
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
        setShowLoader={setShowLoader}
      />
      {showLoader && (
        <Loader />
      )}
    </Container>
  );
};

export default MyApp;