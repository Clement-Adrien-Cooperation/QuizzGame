import type { NextPage } from 'next';
import {useState} from 'react';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  const createUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const body = { pseudo, email, password };

    await fetch(`/api/createOneUser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
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
          onSubmit={createUser}
        >

          <input
            className={styles.form__input}
            type="text"
            value={pseudo}
            onChange={(e) => (setPseudo(e.target.value))}
            placeholder = "Pseudo"
          />

          <input
            className={styles.form__input}
            type="email"
            value={email}
            onChange={(e) => (setEmail(e.target.value))}
            placeholder = "Email"
          />

          <input
            className={styles.form__input}
            value={password}
            onChange={(e) => (setPassword(e.target.value))}
            type="password"
            placeholder = "Password"
          />

          
          <button
            className={styles.form__submit_button}
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