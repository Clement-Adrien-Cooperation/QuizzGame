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

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [difficulty, setDifficulty] = useState<number>(2);

  const [rangeColor, setRangeColor] = useState<string>(`var(--medium)`);
  const [difficultyName, setDifficultyName] = useState<string>('Normal');
  const [colorDifficultyName, setColorDifficultyName] = useState<string>('var(--yellow)');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const checkForm = () => {

    if(title.trim() === '') {
      setWarningMessage('Vous devez choisir un titre');

    } else if(category.trim() === '' || !categoryList.includes(category)) {
      setWarningMessage('Vous devez choisir une catégorie valide');

    } else if(lang === '' || !langList.includes(lang)) {
      setWarningMessage('Vous devez choisir une langue valide');

    } else if(difficulty < 0 || difficulty > 4 ) {
      setWarningMessage("La difficulté n'est pas valide");
    } else {
      return true;
    };
  };

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
          setRangeColor(`var(--very-easy)`);
          setDifficultyName('Très facile');
          setColorDifficultyName('var(--text-color)');
          break;
        case newDifficulty === 1 :
          setRangeColor(`var(--easy)`);
          setDifficultyName('Facile');
          setColorDifficultyName('var(--green)');
          break;
        case newDifficulty === 2 :
          setRangeColor(`var(--medium)`);
          setDifficultyName('Normal');
          setColorDifficultyName('var(--yellow)');
          break;
        case newDifficulty === 3 :
          setRangeColor(`var(--hard)`);
          setDifficultyName('Difficile');
          setColorDifficultyName('var(--orange)');
          break;
        case newDifficulty === 4 :
          setRangeColor(`var(--very-hard)`);
          setDifficultyName('Très difficile');
          setColorDifficultyName('var(--red)');
          break;
          
        default:
          setRangeColor(`var(--very-easy)`);
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

    const user_id :number = 1;
    const is_visible :boolean = true;
    const date :Date = new Date();

    if(checkForm()) {

      // If everything is ok, set up the body
      const body = { user_id, title, category, lang, difficulty, is_visible, date };

      // & create a new user
      await fetch(`/api/createQuizz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      setTitle('');
      setCategory('');
      setDifficulty(2);
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