import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from '../../styles/CreateQuizz.module.scss';

import InputField from '../../components/InputField';
import SelectField from '../../components/SelectField';
import Warning from '../../components/Warning';
import Loader from '../../components/Loader';
import RangeSlider from '../../components/RangeSlider';

const CreateQuizz: NextPage = () => {

  const categoryList :string[] = ['Cinéma', 'Musique', 'Autres'];
  const langList :string[] = ['Français', 'Anglais'];

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [lang, setLang] = useState('');
  const [difficulty, setDifficulty] = useState(2);

  const [rangeColor, setRangeColor] = useState(`linear-gradient(90deg, var(--yellow) 50%, var(--input-color) 50%)`);
  const [difficultyName, setDifficultyName] = useState('Normal');
  const [colorDifficultyName, setColorDifficultyName] = useState('var(--yellow)');
  const [warningMessage, setWarningMessage] = useState('');
  const [disableButton, setDisableButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length > 50) {
      setWarningMessage('Le titre de votre quizz ne doit pas contenir plus de 50 caractères');
      setDisableButton(true);
    } else {
      setTitle(e.target.value);

      if(disableButton) {
        setDisableButton(false);
      };
    };
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const handleChangeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLang(e.target.value);
  };

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const newDifficulty :number = parseInt(e.target.value, 10);

    // Watch if user change min & max values in html
    if(newDifficulty < 0 || newDifficulty > 4 ) {
      setWarningMessage("La difficulté n'est pas valide");
      setDisableButton(true);
    } else {
      setDifficulty(newDifficulty);

      if(disableButton) {
        setDisableButton(false);
      };

      switch (true) {
        case newDifficulty === 0 :
          setRangeColor(`linear-gradient(90deg, var(--input-color) 0%, var(--input-color) 0%)`);
          setDifficultyName('Très facile');
          setColorDifficultyName('var(--text-color)');
          break;
        case newDifficulty === 1 :
          setRangeColor(`linear-gradient(90deg, var(--green) 25%, var(--input-color) 25%)`);
          setDifficultyName('Facile');
          setColorDifficultyName('var(--green)');
          break;
        case newDifficulty === 2 :
          setRangeColor(`linear-gradient(90deg, var(--yellow) 50%, var(--input-color) 50%)`);
          setDifficultyName('Normal');
          setColorDifficultyName('var(--yellow)');
          break;
        case newDifficulty === 3 :
          setRangeColor(`linear-gradient(90deg, var(--orange) 75%, var(--input-color) 75%)`);
          setDifficultyName('Difficile');
          setColorDifficultyName('var(--orange)');
          break;
        case newDifficulty === 4 :
          setRangeColor(`linear-gradient(90deg, var(--red) 100%, var(--input-color) 100%)`);
          setDifficultyName('Très difficile');
          setColorDifficultyName('var(--red)');
          break;
          
        default:
          setRangeColor(`linear-gradient(90deg, var(--input-color) 0%, var(--input-color) 0%)`);
          setDifficultyName('Normal');
          setColorDifficultyName('var(--yellow)');
          break;
        };
    };
  };

  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent refresh
    e.preventDefault();
    setDisableButton(true);
    setShowLoader(true);

    if(title.trim() === '') {
      setWarningMessage('Vous devez choisir un titre');

    } else if(category.trim() === '' || !categoryList.includes(category)) {
      setWarningMessage('Vous devez choisir une catégorie valide');

    } else if(lang === '' || !langList.includes(lang)) {
      setWarningMessage('Vous devez choisir une langue valide');

    } else if(difficulty < 0 || difficulty > 4 ) {
      setWarningMessage("La difficulté n'est pas valide");

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

        { warningMessage && (
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        )}

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >

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
            defaultOption={'Choisissez une catégorie...'}
            options={categoryList}
            isDisabled={false}
            handleFunction={handleChangeCategory}
          />

          <SelectField
            name={'Langue'}
            defaultOption={'Choisissez une langue...'}
            options={langList}
            isDisabled={false}
            handleFunction={handleChangeLang}
          />

          <RangeSlider
            name={'Difficulté'}
            value={difficulty}
            min={'0'}
            max={'4'}
            gradient={rangeColor}
            difficultyName={difficultyName}
            colorDifficultyName={colorDifficultyName}
            handleFunction={handleChangeDifficulty}
          />

          <input
            className={styles.submit}
            type='submit'
            value='Créer'
            disabled={disableButton}
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