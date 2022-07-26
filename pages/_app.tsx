import '../styles/reset.css';
import '../styles/globals.scss';
import Container from '../components/Container/Container';
import type { AppProps } from 'next/app';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [userLogged, setUserLogged] = useState<any>();

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