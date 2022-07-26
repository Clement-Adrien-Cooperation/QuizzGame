import { NextPage } from 'next';
import React, { useState } from 'react';
import styles from '../../styles/CreateQuizz.module.scss';

import InputField from '../../components/InputField/InputField';
import SelectField from '../../components/SelectField/SelectField';
import Warning from '../../components/Warning/Warning';
import Loader from '../../components/Loader/Loader';
import RangeSlider from '../../components/RangeSlider/RangeSlider';

const CreateQuizz: NextPage = () => {

  const categoryList :string[] = ['Cinéma', 'Séries', 'Musique', 'Art', 'Culture générale', 'Géographie', 'Sciences', 'Autres'];
  const langList :string[] = ['Français', 'Anglais'];

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('Normal');
  
  const [difficultyRange, setDifficultyRange] = useState<number>(2);
  const [rangeColor, setRangeColor] = useState<string>(`var(--medium)`);
  const [colorDifficultyName, setColorDifficultyName] = useState<string>('var(--yellow)');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const checkForm = () => {

    if(title.trim() === '') {
      setWarningMessage('Vous devez choisir un titre');

    } else if(category.trim() === '' || !categoryList.includes(category)) {
      setWarningMessage('Vous devez choisir une catégorie valide');

    } else if(lang.trim() === '' || !langList.includes(lang)) {
      setWarningMessage('Vous devez choisir une langue valide');

    } else if(difficultyRange < 0 || difficultyRange > 4 ) {
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
      setDifficultyRange(newDifficulty);

      if(disableButton) {
        setDisableButton(false);
      };

      switch (true) {
        case newDifficulty === 0 :
          setRangeColor(`var(--very-easy)`);
          setDifficulty('Très facile');
          setColorDifficultyName('var(--text-color)');
          break;
        case newDifficulty === 1 :
          setRangeColor(`var(--easy)`);
          setDifficulty('Facile');
          setColorDifficultyName('var(--green)');
          break;
        case newDifficulty === 2 :
          setRangeColor(`var(--medium)`);
          setDifficulty('Normal');
          setColorDifficultyName('var(--yellow)');
          break;
        case newDifficulty === 3 :
          setRangeColor(`var(--hard)`);
          setDifficulty('Difficile');
          setColorDifficultyName('var(--orange)');
          break;
        case newDifficulty === 4 :
          setRangeColor(`var(--very-hard)`);
          setDifficulty('Très difficile');
          setColorDifficultyName('var(--red)');
          break;
          
        default:
          setRangeColor(`var(--very-easy)`);
          setDifficulty('Normal');
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
    const creator :string = 'Vadrial';
    const is_visible :boolean = true;
    const date :string = new Date().toLocaleDateString();

    if(checkForm()) {

        // If everything is ok, set up the body
        const body = { user_id, creator, title, category, lang, difficulty, is_visible, date };

        // & create a new user
        await fetch(`/api/quizz/create`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        .catch((error) => {
          console.log(error);
          
        })
      };

    setTitle('');
    setDisableButton(false);
    setShowLoader(false);
  };

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Créer un s'Quizz
        </h1>

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
            defaultOption={'Choisir une catégorie...'}
            options={categoryList}
            isDisabled={false}
            handleFunction={handleChangeCategory}
          />

          <SelectField
            name={'Langue'}
            defaultOption={'Choisir une langue...'}
            options={langList}
            isDisabled={false}
            handleFunction={handleChangeLang}
          />

          <RangeSlider
            name={'Difficulté'}
            value={difficultyRange}
            min={'0'}
            max={'4'}
            gradient={rangeColor}
            difficulty={difficulty}
            colorDifficultyName={colorDifficultyName}
            handleFunction={handleChangeDifficulty}
          />

          { warningMessage && (
            <Warning
              warningMessage={warningMessage}
              setWarningMessage={setWarningMessage}
            />
          )}

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