import { Category, Question, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FormEvent, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import Notification from '../Notification/Notification';
import Questions from '../Questions/Questions';
import QuizForm from '../QuizForm/QuizForm';
import Warning from '../Warning/Warning';
import styles from './EditQuiz.module.scss';

type Props = {
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const EditQuiz: FunctionComponent<Props> = ({
  userLogged,
  setShowLoader
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
      
    getCategories();

    if(router.pathname.includes('create')) {
      setPageTitle("Créer un s'Quizz");
    } else {

      setPageTitle(`Modifier le quiz "${router.query.slug}"`);
      getQuiz();
    };
  }, []);

  const getCategories = async() => {
    setShowLoader(true);

    await fetch('/api/category/getAll')
    .then(async(res) => {
      const data = await res.json();

      const categoriesArray: string[] = [];

      data.forEach((category: Category) => categoriesArray.push(category.name));

      setCategoriesList(categoriesArray);
      
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const getQuiz = async() => {
    setShowLoader(true);

    await fetch('/api/quiz/getOne', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ title: router.query.slug })
    })
    .then(async(res) => {
      const data = await res.json();

      if(res.status === 404) {
        router.push('/');
      } else {

        if(userLogged.id !== data.user_id) {
          router.push('/');
        } else {
          
          setQuizID(data.id);

          setCurrentTitle(data.title);
          setTitle(data.title);

          setCategory(data.category);
          setDefaultCategory(data.category);

          setDifficulty(data.difficulty);
          setPreviousDifficulty(data.difficulty);

          if(data.nbOfQuestions > 0) {
            await getQuestionsFromQuiz(data.id);
          };
          
          setShowLoader(false);
        };
      };
    })
    .catch((error) => {
      console.log(error);
      setShowLoader(false);
    });
  };

  const getQuestionsFromQuiz = async(quiz_id: string) => {

    await fetch('/api/question/getAllFromQuiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_id })
    })
    .then(async(res) => {
      const data = await res.json();
      
      setQuestions(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const setPreviousDifficulty = (previousDifficulty: string) => {
    switch (true) {
      case previousDifficulty === 'Très facile' :
        setRangeColor(`var(--very-easy)`);
        setDifficultyRange(0);
        setColorDifficultyName('var(--text-color)');
        break;
      case previousDifficulty === 'Facile' :
        setRangeColor(`var(--easy)`);
        setDifficultyRange(1);
        setColorDifficultyName('var(--green)');
        break;
      case previousDifficulty === 'Normal' :
        setRangeColor(`var(--medium)`);
        setDifficultyRange(2);
        setColorDifficultyName('var(--yellow)');
        break;
      case previousDifficulty === 'Difficile' :
        setRangeColor(`var(--hard)`);
        setDifficultyRange(3);
        setColorDifficultyName('var(--orange)');
        break;
      case previousDifficulty === 'Très difficile' :
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

    if(router.pathname.includes('create')) {
      createQuiz();
    } else {
      updateQuiz();
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
      rate: 0,
      date: new Date().toLocaleDateString()
    };

    await fetch(`/api/quiz/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status === 201) {

        const data = await res.json();

        if(data.nbOfQuestions > 0) {
          createQuestions(data.id);
        };
      } else {
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

    console.log(body);
    
    
    await fetch(`/api/quiz/update`, {
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

        if(data.nbOfQuestions > 0) {
          updateQuestions();
        } else {
          deleteQuestions(data.id);
        };
      } else {
        setWarningMessage('Ce titre est déjà utilisé');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const deleteQuestions = async(quizz_id: string) => {

    const token = localStorage.getItem('token');

    await fetch('/api/question/deleteMany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ quizz_id })
    })
    .then((res) => {
      if(res.status === 404) {
        console.log('Une erreur est survenue dans la suppression des questions');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const createQuestions = async(quiz_id: string) => {

    const token = localStorage.getItem('token');

    const questionsToSave = [...questions];

    questionsToSave.forEach(question => {
      question.id = uuidv4();
      question.user_id = userLogged.id;
      question.quiz_id = quiz_id
    });

    console.log(questionsToSave);
      
      
    await fetch('/api/question/createMany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(questionsToSave)
    })
    .then(() => {
      setQuestions(questionsToSave);
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

    await fetch('/api/question/createMany', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(questionsToSave)
    })
    .then(() => {
      setQuestions(questionsToSave);
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