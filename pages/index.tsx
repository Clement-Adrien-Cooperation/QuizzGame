import type { NextPage } from 'next';
import React, {useState} from 'react';
import Router from 'next/router'
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  const [pseudo, setPseudo] = useState('Vadrial');
  const [email, setEmail]= useState('adrienlcp@gmail.com')
  const [password, setPassword]= useState('admin')
  const [isAdmin, setIsAdmin] = useState(false)

  const createUser = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { pseudo, email, password }
      await fetch(`/api/createOneUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      // await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  const getUsers = async () => {
    await fetch('/api/getAllUsers')
    .then((res) => {
      console.log(res);
    })
  };
  
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        s'Quizz Game
      </h1>
      
      <form
        onSubmit={createUser}
      >

        <input
          type="text"
          value={pseudo}
          onChange={(e) => (setPseudo(e.target.value))}
          placeholder = "Pseudo"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => (setEmail(e.target.value))}
          placeholder = "Email"

        />

        <input
          value={password}
          onChange={(e) => (setPassword(e.target.value))}
          type="password"
          placeholder = "Password"
        />

        
        <button
          type='submit'
        >
          Envoyer
        </button>







      </form>



      <button onClick={getUsers}>
        GET USERS
      </button>
    </section>
  );
};

export default Home;

