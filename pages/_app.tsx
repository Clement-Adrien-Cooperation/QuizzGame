import Container from '../components/Container/Container';
import '../styles/reset.css';
import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { useState } from 'react';

type UserTypes = {

};

function MyApp({ Component, pageProps }: AppProps) {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState([]);

  return (
    <Container
      isLogged={isLogged}
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