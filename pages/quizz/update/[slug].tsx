import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loader from '../../../components/Loader/Loader';
import Warning from '../../../components/Warning/Warning';
import styles from '../../../styles/quizz/UpdateQuizz.module.scss';

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

type QuizTypes = {
  id: number,
  creator: string,
  title: string,
  category?: string,
  difficulty?: string,
  lang?: string,
  image?: string,
  is_visible: boolean,
  date: string,
  rate?: number,
  reported?: boolean,
  reportMessage?: string,
  questions?: QuestionTypes[]
};

const emptyQuiz: QuizTypes = {
  id: 0,
  creator: '',
  title: '',
  category: '',
  difficulty: '',
  lang: '',
  image: '',
  is_visible: true,
  date: '',
  rate: 0,
  reported: false,
  reportMessage: '',
  questions: undefined
};

const UpdateQuiz: NextPage = ({ isLogged, userLogged }:any) => {
  
  const router = useRouter();

  const [quiz, setQuiz] = useState(emptyQuiz);

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {

  //   if(!isLogged) {
  //     router.push('/');
  //   } else {
  //     document.title = `Modifier mon quiz - s'Quizz Game`;
      getQuiz();
  //   };
  }, []);

  const getQuiz = async () => {
    
    const body = { title: router.query.slug }

    await fetch('/api/quizz/getOne', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      const data = await res.json();
      setQuiz(data);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  console.log(quiz);
  
  return (
    <>
      <form className={styles.form}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Éditer un quiz
          </h1>

          <input
            className={styles.submit}
            type='submit'
            value='Sauvegarder'
            disabled={disableButton}
          />
        </header>

        {/* <QuizForm
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
        /> */}

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

export default UpdateQuiz;