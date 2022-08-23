import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Notification from '../Notification/Notification';
import Questions from '../Questions/Questions';
import QuizForm from '../QuizForm/QuizForm';
import Warning from '../Warning/Warning';
import styles from './EditQuiz.module.scss';

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
  nbOfQuestions: number,
  category: string,
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
  proposals: string[],
  answer: string,
  reported?: boolean,
  reportMessage?: string
};

const EditQuiz = ({ userLogged }: QuizEditProps) => {

  const router = useRouter();

  let questionsToSave: QuestionTypes[] = [];

  const categoryList :string[] = [
    'Actualités',
    'Art',
    'BD / Manga',
    'Divertissement',
    'Cinéma',
    'Culture générale',
    'Dessins animés',
    'Géographie',
    'Histoire',
    'Jeux vidéo',
    'Littérature',
    'Loisirs',
    'Médias',
    'Musique',
    'Sciences',
    'Séries',
    'Sport',
    'Technologies',
    'Divers',
    'Autres'
  ];

  const [quizID, setQuizID] = useState<number>(0);

  const [pageTitle, setPageTitle] = useState<string>("Éditer un s'Quizz");
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const [category, setCategory] = useState<string>('');
  const [defaultCategory, setDefaultCategory] = useState<string>('Choisir une catégorie...');
  
  const [difficulty, setDifficulty] = useState<string>('Normal');
  const [difficultyRange, setDifficultyRange] = useState<number>(2);
  const [rangeColor, setRangeColor] = useState<string>(`var(--medium)`);
  const [colorDifficultyName, setColorDifficultyName] = useState<string>('var(--yellow)');

  const [questions, setQuestions] = useState<QuestionTypes[]>([]);
  
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(true);

  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    
    if(router.pathname.includes('create')) {
      setPageTitle("Créer un s'Quizz");
      setShowLoader(false);
    } else {
      setPageTitle(`Modifier le quiz "${router.query.slug}"`);
      getQuiz();
    };
  }, []);

  const getQuiz = async () => {

    const body = {
      title: router.query.slug
    }

    await fetch('/api/quizz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();
      
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

        getQuestionsFromQuiz(data.id);
      };
    })
    .catch((error) => {
      console.log(error);
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

      setQuestions(data);
    })
    .then(() => {
      setShowLoader(false);
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

    } else if(category.trim() === '' || !categoryList.includes(category)) {
      setWarningMessage('Vous devez choisir une catégorie valide');

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
          setRangeColor(`var(--medium)`);
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
    setWarningMessage('');
    setNotification('');

    const user_id :number = userLogged.id;
    const creator :string = userLogged.pseudo;
    
    if(checkForm()) {
      // If everything is ok, setup the body
      let body = {
        // currentTitle is empty if this is a creation
        // if not, useEffect updated it & we enter in "update"
        // in prisma/quiz/upsert
        // We need this double title if user change title of quiz
        currentTitle,
        user_id,
        creator,
        nbOfQuestions: questions.length,
        title,
        category,
        difficulty
      };

      // & create a new user
      await saveQuiz(body);

      // If there are questions in state, save it.
      if(questions.length > 0) {
        await saveQuestions(body.title);
      } else {
        setNotification('✅ Quiz enregistré');
      };

      setDisableButton(false);
      setShowLoader(false);
    } else {

      setWarningMessage('Une erreur est survenue. Veuillez réessayer ou nous contacter');
      setDisableButton(false);
      setShowLoader(false);
    };
  };

  const saveQuiz = async(body: QuizTypes) => {
    await fetch(`/api/quizz/upsert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      
      const data = await res.json();

      if(router.pathname.includes('create')) {
        router.push(`/quizz/update/${data.title}`);
        setNotification('✅ Quiz enregistré');
      } else {
        setNotification('✅ Quiz enregistré');
      };

      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const saveQuestions = async(title: string) => {

    if(router.pathname.includes('create')) {
    
      // Get the quizz ID with the title
      await fetch('/api/quizz/getOne', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      })
      .then(async(res) => {

        const data = await res.json();

        questionsToSave = [...questions];

        questionsToSave.forEach(question => question.quizz_id = data.id);
      })
      .then(async() => {
        
        await fetch('/api/question/createMany', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(questionsToSave)
        })
        .then(() => {
          setQuestions(questionsToSave);
          setNotification('✅ Quiz enregistré');
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });

    } else {
      
      const questionsToSave = [...questions];

      questionsToSave.forEach(question => question.quizz_id = quizID);

      await fetch('/api/question/createMany', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionsToSave)
      })
      .then(() => {
        setNotification('✅ Quiz enregistré');
      })
      .catch((error) => {
        console.log(error);
        setWarningMessage('Une erreur est survenue, veuillez réessayer ou nous contacter');
        setShowLoader(false);
      });
    };
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
          categoryList={categoryList}
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

      <Questions
        questions={questions}
        setQuestions={setQuestions}
      />

      {showLoader && (
        <Loader />
      )}

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