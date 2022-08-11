import '../styles/reset.css';
import '../styles/globals.scss';
import Container from '../components/Container/Container';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type UserLoggedTypes = {
  id: number,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

const unLoggedUser = {
  id: 1,
  pseudo: 'Vadrial',
  email: 'adrienlcp@gmail.com',
  password: 'TDYQCM&S3o!zao6i',
  avatar: '',
  is_admin: true,
  is_banished: false
};

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const [isLogged, setIsLogged] = useState<boolean>(true);
  const [userLogged, setUserLogged] = useState<UserLoggedTypes>(unLoggedUser);
  
  const checkUser = async () => {

    const body = { user_id: userLogged.id };
      
    await fetch('/api/user/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {

      const data = await res.json();

      if(data.is_banished === true) {
        router.push('/banned');
      };
    });
  };
  
  useEffect(() => {
    if(isLogged) {
      checkUser();
    };
  }, [userLogged]);

  return (
    <Container
      isLogged={isLogged}
      userLogged={userLogged}
      setIsLogged={setIsLogged}
      setUserLogged={setUserLogged}
    >
      <Component 
        {...pageProps}
        isLogged={isLogged}
        setIsLogged={setIsLogged}
        userLogged={userLogged}
        setUserLogged={setUserLogged}
      />
    </Container>
  );
};

export default MyApp;