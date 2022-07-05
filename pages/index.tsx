import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setWarningMessage('');

    if(pseudo === '' || email === '' || password === '') {
      setWarningMessage('Veuillez remplir tous les champs');

    } else if (!email.includes('@') && !email.includes('.')) {
      setWarningMessage('Veuillez entrer un email valide');
    } else {

      const body = { pseudo, email, password };

      await fetch(`/api/createOneUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };
  };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {

    setPseudo(e.target.value);
  };

  const getUsers = async () => {
    await fetch('/api/getAllUsers')
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
  };
  
  return (
    <>

      <h1 className={styles.title}>
        s'Quizz Game
      </h1>
      
      <section className={styles.container}>

        <h2 className={styles.container__title}>
          S'inscrire
        </h2>

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >
          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              min='1'
              max='30'
              id='pseudo'
              value={pseudo}
              onChange={handleChangePseudo}
              required
              // placeholder = "Pseudo"
            />

            <label
              htmlFor='pseudo'
              className={styles.label}
            >
              Pseudo
            </label>
          </div>

          <div className={styles.field}>
            <input
              className={styles.input}
              type="text"
              id='email'
              value={email}
              onChange={(e) => (setEmail(e.target.value))}
              required
              // placeholder = "Email"
            />

            <label
              htmlFor='email'
              className={styles.label}
            >
              Adresse mail
            </label>
          </div>


          <div className={styles.field}>
            <input
              className={styles.input}
              value={password}
              min='1'
              max='50'
              id='password'
              onChange={(e) => (setPassword(e.target.value))}
              required
              type="password"
              // placeholder = "Mot de passe"
            />

            <label
              htmlFor='password'
              className={styles.label}
            >
              Mot de passe
            </label>
          </div>

          <p className={styles.warning}>
            {warningMessage}
          </p>
          
          <button
            className={styles.submit_button}
            type='submit'
          >
            Envoyer
          </button>

        </form>

      </section>

      <section className={styles.container}>

        <button
          className={styles.button}
          type='button'
          onClick={getUsers}
        >
          GET USERS
        </button>

      </section>

    </>
  );
};

export default Home;