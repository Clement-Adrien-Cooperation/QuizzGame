import type { NextPage } from 'next';
import { useState } from 'react';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent the refresh
    e.preventDefault();

    // Reset the warning message
    setWarningMessage('');

    // If there is nothing in one of the fields
    if(pseudo === '' || email === '' || password === '') {

      // We warn user
      setWarningMessage('Veuillez remplir tous les champs');

    // If email is not valid
    } else if (!email.includes('@') && !email.includes('.')) {

      // We warn him too
      setWarningMessage('Veuillez entrer un email valide');
    } else {

      // If everything is ok, set up the body
      const body = { pseudo, email, password };

      // & create a new user
      await fetch(`/api/createOneUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    };
  };

  const handleChangePseudo = (e: React.ChangeEvent<HTMLInputElement>) => {

    // If pseudo is longer than 30 letters
    if(pseudo.length > 30) {
      // We warn user
      setWarningMessage('Votre pseudo ne doit pas excéder 30 caractères');
    } else {
      // If not, we update state
      setPseudo(e.target.value);
    };
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