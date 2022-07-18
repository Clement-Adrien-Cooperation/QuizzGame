import { NextPage } from 'next';
import React, { useState, } from 'react';
import styles from '../../styles/CreateQuizz.module.scss';

import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import Warning from '../../components/Warning';
import Loader from '../../components/Loader';

const CreateQuizz: NextPage = () => {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState(3);

  const [warningMessage, setWarningMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLInputElement>) => {

    const newDifficulty :number = parseInt(e.target.value, 10);
    setDifficulty(newDifficulty);
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent refresh
    e.preventDefault();
    setDisableButton(true);
    setShowLoader(true);

    if(title === '') {
      setWarningMessage('Vous devez choisir un titre');
    } else if(category === '') {
      setWarningMessage('Vous devez choisir une catégorie');
    } else {

      // If everything is ok, set up the body
      const body = { title, category, difficulty };

      // & create a new user
      await fetch(`/api/createQuizz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      setTitle('');
      setCategory('');
      setDifficulty(3);
    };
    
    setDisableButton(false);
    setShowLoader(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Créer un s'Quizz
        </h2>

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >

          { warningMessage && (
            <Warning
              warningMessage={warningMessage}
              setWarningMessage={setWarningMessage}
            />
          )}

          <InputField
            name={'Nom du Quizz'}
            state={title}
            inputID={'title'}
            type={'text'}
            isDisabled={false}
            handleFunction={handleChangeTitle}
          />

          <SelectField
            name={'Catégorie'}
            options={['Cinéma', 'Musique', 'Autres']}
            isDisabled={false}
            handleFunction={handleChangeCategory}
          />

          <div className={styles.range}>
            <label
              className={styles.range__label}
              htmlFor='difficulty'
            >
              Difficulté
            </label>

            <input
              className={styles.range__input}
              type='range'
              id='difficulty'
              value={difficulty}
              min='1'
              max='5'
              onChange={handleChangeDifficulty}
            />

            <span className={styles.range__value}>
              {difficulty}
            </span>
          </div>

          <input
            className={styles.submit}
            type='submit'
            value='Créer'
          />

        </form>
      </div>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default CreateQuizz;