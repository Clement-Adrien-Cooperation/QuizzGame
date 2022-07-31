import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import Loader from '../components/Loader/Loader';
import styles from '../styles/Banned.module.scss';

const Banned: NextPage = ({ isLogged, userLogged }:any) => {

  const router = useRouter();

  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
  
    document.title = "Banni";
  
    if(isLogged) {
      checkUser();
    } else {
      router.push('/');
    };
  }, []);

  const checkUser = async () => {

    setShowLoader(true);

    const body = { user_id: userLogged.id };
      
    await fetch('/api/user/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {

      const data = await res.json();

      setShowLoader(false);

      if(data.is_banished === false) {
        router.push('/');
      };
    });
  };

  return (
    <>
      <div className={styles.container}>

        <h1 className={styles.title}>
          Vous avez été banni
        </h1>

        <p className={styles.message}>
          Si vous pensez que c'est une erreur, vous pouvez nous envoyer un message ci-dessous
        </p>

        <ContactForm />
      </div>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default Banned;