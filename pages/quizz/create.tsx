import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from '../../styles/CreateQuizz.module.scss';

import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import Warning from '../../components/Warning';

const CreateQuizz: NextPage = () => {

  const [quizzTitle, setQuizzTitle] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizzTitle(e.target.value);
  };

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent refresh
    e.preventDefault();


    console.log(difficulty);

    console.log('submit');
    
    
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Créer un s'Quizz
      </h2>

      <form
        className={styles.form}
        onClick={handleSubmitForm}
      >

        { warningMessage && (
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        )}

        <InputField
          name={'Nom du Quizz'}
          state={quizzTitle}
          inputID={'title'}
          type={'text'}
          isDisabled={false}
          handleFunction={handleChangeTitle}
        />

        <SelectField
          name={'Catégorie'}
          options={['Cinéma', 'Musique', 'Autres']}
          isDisabled={false}
          handleFunction={handleChangeDifficulty}
        />

        <input
          className={styles.submit}
          type='submit'
          value='Créer'
        />

      </form>
    </div>
  );
};

export default CreateQuizz;