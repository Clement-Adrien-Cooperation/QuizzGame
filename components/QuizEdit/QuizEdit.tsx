import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Questions from '../Questions/Questions';
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

type QuizTypes = {
  id?: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  lang: string,
  difficulty: string,
  is_visible?: boolean,
  date?: string,
  reported?: boolean,
  reportMessage?: string
};

type QuestionTypes = {
  id: number,
  quizz_id: number,
  question: string,
  description: string,
  propositions: string[],
  answer: string,
  reported?: boolean,
  reportMessage?: string
};

const QuizEdit = ({ userLogged }: QuizEditProps) => {

  const router = useRouter();

  let questionsToSave:QuestionTypes[] = [];

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

  const [pageTitle, setPageTitle] = useState<string>("Éditer un s'Quizz");
  const [currentTitle, setCurrentTitle] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>('Normal');
  
  const [difficultyRange, setDifficultyRange] = useState<number>(2);
  const [rangeColor, setRangeColor] = useState<string>(`var(--medium)`);
  const [colorDifficultyName, setColorDifficultyName] = useState<string>('var(--yellow)');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const [questions, setQuestions] = useState<QuestionTypes[]>([]);

  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    
    if(router.pathname.includes('create')) {
      setPageTitle("Créer un s'Quizz");
    } else {
      getQuiz();
    };
  }, []);

  const getQuiz = async () => {
    
    const quizTitle = router.query.slug;

    await fetch('/api/quizz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: quizTitle })
    })
    .then(async(res) => {
      const data = await res.json();
      
      console.log(data);
      getQuestionsFromQuiz(data.id);

      setTitle(data.title);
      setCategory(data.category);
      setDifficulty(data.difficulty);
      setLang(data.lang);
      
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const getQuestionsFromQuiz = async(quizz_id: number) => {

    await fetch('/api/question/getAllFromQuiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizz_id })
    })
    .then(async(res) => {
      const data = await res.json();
      
      console.log(data);
      setQuestions(data);
      
    })
    .catch((error) => {
      console.error(error);
    });
  };

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

    if(checkForm()) {

      // If everything is ok, set up the body
      const body = {
        user_id,
        creator,
        title,
        category,
        lang,
        difficulty
      };

      // & create a new user
      await saveQuiz(body);

      if(questions.length > 0) {
        await saveQuestions(body.title);
      };
    };

    setTitle('');
    setDisableButton(false);
    setShowLoader(false);
  };

  const saveQuiz = async(body: QuizTypes) => {
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
      console.error(error);
    });
  };

  const saveQuestions = async(title: string) => {
    
    // Get the quizz ID with the title
    await fetch('/api/quizz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({title})
    })
    .then(async(res) => {

      const data = await res.json();

      questionsToSave = [...questions];
      
      questionsToSave.forEach(question => {
        question.quizz_id = data.id;
      });

      console.log(questionsToSave);
      
    })
    .then(async() => {
      
      await fetch('/api/question/createMany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionsToSave)
      })
      .then(async(res) => {

        const data = await res.json();
        console.log(data);

      })
      .catch((error) => {

        console.error(error);
      });
    })
    .catch((error) => {

      console.error(error);
    });
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <header className={styles.header}>
          <h1 className={styles.title}>
            {pageTitle}
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

      <Questions
        questions={questions}
        setQuestions={setQuestions}
      />

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default QuizEdit;