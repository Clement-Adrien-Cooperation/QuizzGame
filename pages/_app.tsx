import '../styles/reset.css';
import '../styles/globals.scss';
import Container from '../components/Container/Container';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type UserLoggedTypes = {
  id: string,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

const unLoggedUser = {
  id: '',
  pseudo: '',
  email: '',
  password: '',
  avatar: '',
  is_admin: false,
  is_banished: false
};

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<UserLoggedTypes>(unLoggedUser);
  
  const checkUser = async () => {

    const token = localStorage.getItem('token');

    await fetch('/api/user/getOne', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ user_id: userLogged.id})
    })
    .then(async(res) => {

      const data = await res.json();

      console.log(data);
      

      if(data.is_banished === true) {
        router.push('/banned');
      };
    });
  };
  
  useEffect(() => {
    if(isLogged) {
      checkUser();
    };
  }, [isLogged]);

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