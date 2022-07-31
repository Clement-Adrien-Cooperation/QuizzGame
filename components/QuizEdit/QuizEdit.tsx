import { useState } from 'react';
import Loader from '../Loader/Loader';
import QuizForm from '../QuizForm/QuizForm';
import Warning from '../Warning/Warning';
import styles from './QuizEdit.module.scss';

type UserLoggedTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean
};

type QuizEditProps = {
  userLogged: UserLoggedTypes
};

const QuizEdit = ({ userLogged }: QuizEditProps) => {

  const langList :string[] = [
    'Français',
    'Anglais'
  ];
  const categoryList :string[] = [
    'Art',
    'BD / Manga',
    'Divertissement',
    'Cinéma',
    'Culture générale',
    'Géographie',
    'Histoire',
    'Littérature',
    'Loisirs',
    'Médias',
    'Musique',
    'Sciences',
    'Séries',
    'Sport',
    'Divers',
    'Autres'
  ];

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
      setWarningMessage('');
      if(disableButton) {
        setDisableButton(false);
      };
    };

    setTitle(e.target.value);
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

    const user_id :number = userLogged.id;
    const creator :string = userLogged.pseudo;
    const is_visible :boolean = true;
    const date :string = new Date().toLocaleDateString();

    if(checkForm()) {

      // If everything is ok, set up the body
      const body = { user_id, creator, title, category, lang, difficulty, is_visible, date };

      // & create a new user
      await fetch(`/api/quizz/upsert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then(async(res) => {
        
        const data = await res.json();

        console.log(data);
        
      })
      .catch((error) => {
        console.log(error);
      });
    };

    setTitle('');
    setDisableButton(false);
    setShowLoader(false);
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >

        <header className={styles.header}>
          <h1 className={styles.title}>
            Créer un s'Quizz
          </h1>

          <input
            className={styles.submit}
            type='submit'
            value='Sauvegarder'
            disabled={disableButton}
          />
        </header>

        <QuizForm
          title={title}
          categoryList={categoryList}
          langList={langList}
          difficulty={difficulty}
          difficultyRange={difficultyRange}
          rangeColor={rangeColor}
          colorDifficultyName={colorDifficultyName}
          handleChangeDifficulty={handleChangeDifficulty}
          handleChangeTitle={handleChangeTitle}
          handleChangeCategory={handleChangeCategory}
          handleChangeLang={handleChangeLang}
        />

        { warningMessage && (
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        )}
      </form>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default QuizEdit;