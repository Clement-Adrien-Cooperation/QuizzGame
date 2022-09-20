import { Category, Question, Quiz, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import { ChangeEvent, Dispatch, FormEvent, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import Notification from '../Notification/Notification';
import Questions from '../Questions/Questions';
import QuizForm from '../QuizForm/QuizForm';
import Warning from '../Warning/Warning';
import styles from './EditQuiz.module.scss';

type Props = {
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  quizData: Quiz,
  questionsData: Question[],
  categoriesData: Category[]
};

const EditQuiz: FunctionComponent<Props> = ({
  userLogged,
  setShowLoader,
  quizData,
  questionsData,
  categoriesData
}) => {

  const router = useRouter();

  const [quizID, setQuizID] = useState<string>('');

  const [pageTitle, setPageTitle] = useState<string>("Éditer un s'Quizz");
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [category, setCategory] = useState<string>('');
  const [defaultCategory, setDefaultCategory] = useState<string>('Choisir une catégorie...');
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  
  const [difficulty, setDifficulty] = useState<string>('Normal');
  const [difficultyRange, setDifficultyRange] = useState<number>(2);
  const [rangeColor, setRangeColor] = useState<string>(`var(--medium)`);
  const [colorDifficultyName, setColorDifficultyName] = useState<string>('var(--yellow)');

  const [questions, setQuestions] = useState<Question[]>([]);
  
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const [notification, setNotification] = useState<string>('');

  useEffect(() => {

    setCategories();

    if(router.pathname.includes('quizz/create')) {
      setPageTitle("Créer un s'Quizz");
    } else {
      
      if(userLogged.id === quizData.user_id) {

        setPageTitle(`Modifier le quiz "${router.query.slug}"`);
        setPreviousData(quizData);

        if(quizData.nbOfQuestions > 0) {
          setQuestions(questionsData);
        };

      } else {
        router.push('/');
      };
    };
  }, []);

  const setCategories = () => {

    const categoriesArray: string[] = [];

    categoriesData?.forEach((category: Category) => categoriesArray.push(category.name));

    setCategoriesList(categoriesArray);
  };

  const setPreviousData = (quizData: Quiz) => {
    
    setQuizID(quizData.id);

    setCurrentTitle(quizData.title);
    setTitle(quizData.title);

    setCategory(quizData.category);

    setDifficulty(quizData.difficulty);
    setPreviousDifficulty();
  };

  const setPreviousDifficulty = () => {
    switch (true) {
      case quizData.difficulty === 'Très facile' :
        setRangeColor(`var(--very-easy)`);
        setDifficultyRange(0);
        setColorDifficultyName('var(--text-color)');
        break;
      case quizData.difficulty === 'Facile' :
        setRangeColor(`var(--easy)`);
        setDifficultyRange(1);
        setColorDifficultyName('var(--green)');
        break;
      case quizData.difficulty === 'Normal' :
        setRangeColor(`var(--medium)`);
        setDifficultyRange(2);
        setColorDifficultyName('var(--yellow)');
        break;
      case quizData.difficulty === 'Difficile' :
        setRangeColor(`var(--hard)`);
        setDifficultyRange(3);
        setColorDifficultyName('var(--orange)');
        break;
      case quizData.difficulty === 'Très difficile' :
        setRangeColor(`var(--very-hard)`);
        setDifficultyRange(4);
        setColorDifficultyName('var(--red)');
        break;
        
      default:
        setRangeColor(`var(--medium)`);
        setDifficultyRange(2);
        setColorDifficultyName('var(--yellow)');
        break;
    };
  };
  
  const checkForm = () => {

    if(title.trim() === '') {
      setWarningMessage('Vous devez choisir un titre');

    } else if(category.trim() === '' || !categoriesList.includes(category)) {
      setWarningMessage('Vous devez choisir une catégorie valide');

    } else if(difficultyRange < 0 || difficultyRange > 4 ) {
      setWarningMessage("La difficulté n'est pas valide");
      
    } else {
      return true;
    };
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.length > 50) {
      setWarningMessage('Le titre de votre quizz ne doit pas contenir plus de 50 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');
      if(disableButton) {
        setDisableButton(false);
      };
    };

    setTitle(event.target.value);
  };

  const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const handleChangeDifficulty = (event: ChangeEvent<HTMLInputElement>) => {
    
    const newDifficulty :number = parseInt(event.target.value, 10);

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
          setRangeColor(`var(--medium)`);
          setDifficulty('Normal');
          setColorDifficultyName('var(--yellow)');
          break;
      };
    };
  };

  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    // Prevent refresh
    event.preventDefault();
    setDisableButton(true);
    setShowLoader(true);
    setWarningMessage('');
    setNotification('');

    if(checkForm()) {

      await saveQuiz();

      setNotification('✅ Quiz enregistré');

      setDisableButton(false);
      setShowLoader(false);
      
      if(router.pathname.includes('create')) {
        router.push(`/quizz/update/${title}`);
      };
    } else {

      setWarningMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter');
      setDisableButton(false);
      setShowLoader(false);
    };
  };

  const saveQuiz = async() => {

    if(router.pathname.includes('quizz/create')) {
      createQuiz();
    } else {

      if(questions.length === 0) {
        deleteQuestions();
      } else {
        updateQuestions();
      };

      if(title !== quizData.title
      || category !== quizData.category
      || difficulty !== quizData.difficulty
      || questions.length !== quizData.nbOfQuestions) {
        updateQuiz();
      };
    };
  };

  const createQuiz = async() => {

    const token = localStorage.getItem('token');

    const body = {
      user_id: userLogged.id,
      creator: userLogged.pseudo,
      title,
      nbOfQuestions: questions.length,
      category,
      difficulty,
      rate: [],
      date: new Date().toLocaleDateString()
    };

    await fetch(`${api}/quiz/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status !== 201) {
        setWarningMessage('Ce titre est déjà utilisé');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const updateQuiz = async() => {
      
    const token = localStorage.getItem('token');

    const body = {
      currentTitle,
      title,
      category,
      difficulty,
      nbOfQuestions: questions.length
    };

    await fetch(`${api}/quiz/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status === 200) {

        const data = await res.json();
        setPreviousData(data);
      } else {
        setWarningMessage('Ce titre est déjà utilisé');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteQuestions = async() => {

    const token = localStorage.getItem('token');

    await fetch(`${api}/question/deleteMany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ quiz_id: quizID })
    })
    .then((res) => {
      if(res.status === 404) {
        setWarningMessage('Une erreur est survenue dans la suppression des questions');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const updateQuestions = async() => {

    const token = localStorage.getItem('token');

    const questionsToSave = [...questions];

    questionsToSave.forEach(question => {
      question.id = uuidv4();
      question.user_id = userLogged.id;
      question.quiz_id = quizID;
    });

    await fetch(`${api}/question/createMany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(questionsToSave)
    })
    .then((res) => {
      if(res.status !== 201) {
        setWarningMessage('Une erreur est survenue, veuillez réessayer ou nous contacter');
      };
    })
    .catch((error) => {
      console.log(error);
      setWarningMessage('Une erreur est survenue, veuillez réessayer ou nous contacter');
      setShowLoader(false);
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
            title='Sauvegarder ce quiz'
            aria-label='Sauvegarder ce quiz'
            value='Sauvegarder'
            disabled={disableButton}
          />
        </header>

        <QuizForm
          title={title}
          categoriesList={categoriesList}
          defaultCategory={defaultCategory}
          difficulty={difficulty}
          difficultyRange={difficultyRange}
          rangeColor={rangeColor}
          colorDifficultyName={colorDifficultyName}
          handleChangeDifficulty={handleChangeDifficulty}
          handleChangeTitle={handleChangeTitle}
          handleChangeCategory={handleChangeCategory}
        />

        {warningMessage && (
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        )}
      </form>

      {router.pathname.includes('create') ? '' :
        <Questions
          questions={questions}
          setQuestions={setQuestions}
        />
      }

      {notification && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}
    </>
  );
};

export default EditQuiz;