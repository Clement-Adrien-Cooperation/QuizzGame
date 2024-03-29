import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import type { Question, Quiz, User, Comment } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import GameDetails from '../../components/Game/GameDetails/GameDetails';
import GameScreen from '../../components/Game/GameScreen/GameScreen';
import Report from '../../components/Report/Report';
import Warning from '../../components/Warning/Warning';
import styles from '../../styles/quizz/QuizGame.module.scss';
import QuizComments from '../../components/Comment/QuizComments/QuizComments';

const emptyQuiz: Quiz = {
  id: '',
  user_id: '',
  creator: '',
  title: '',
  category: '',
  difficulty: '',
  is_visible: true,
  date: '',
  nbOfQuestions: 0,
  nbOfPlayed: 0,
  rate: [],
  rates_IDs: []
};

const emptyQuestion: Question = {
  id: '',
  user_id: '',
  quiz_id: '',
  question: '',
  description: '',
  proposals: [],
  answer: ''
};

type Props = {
  userLogged: User,
  isLogged: boolean,
  quizData: Quiz,
  questionsData: Question[],
  commentsData: Comment[],
  setPageTitle: Dispatch<SetStateAction<string>>
};

const QuizGame: NextPage<Props> = ({
  userLogged,
  isLogged,
  quizData,
  questionsData,
  commentsData,
  setPageTitle
}) => {

  const router = useRouter();

  const [quiz, setQuiz] = useState<Quiz>(emptyQuiz);
  const [questions, setQuestions] = useState<Question[]>([emptyQuestion]);

  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(emptyQuestion);
  const [currentProposals, setCurrentProposals] = useState<string[]>(['']);

  const [playing, setPlaying] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [report, setReport] = useState<boolean>(false);

  useEffect(() => {

    const title = router.query.slug;

    if(userLogged.is_banished) {
      router.push('/banned');
    } else {

      setPageTitle(`${title} - s'Quizz Game`);

      if(questionsData.length < 10) {
        setWarningMessage('Ce quiz contient moins de 10 questions');
      } else {
        setQuiz(quizData);

        randomizeQuestions();
      };
    };
  }, []);

  const getRandomNumber = (min: number, max: number) => {
    // Classic random number generator
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const randomizeQuestions = () => {
    // Create a array with 10 random questions from current quiz
    const gameQuestions = [];
    const availableQuestions = [...questionsData];

    // Loop for push 10 random questions in a new array
    for(let i = 0; i < 10; i++) {

      // Set the new "maximum index" for availables questions
      const maxIndex = availableQuestions.length -1;

      // Get a random number between 0 and this maximum
      const randomIndex = getRandomNumber(0, maxIndex);

      // Use this number as index to choose a random question
      const randomQuestion = availableQuestions[randomIndex];

      // Push this random question in game questions array
      gameQuestions.push(randomQuestion);

      // Then, delete this question from available questions,
      // to not have this question again in this game
      availableQuestions.splice(randomIndex, 1);
    };

    setQuestions(gameQuestions);

    // Set this randomized array in state
    setCurrentQuestion(gameQuestions[0]);

    // Do the same with proposals & answer from the first question
    randomizeProposals(gameQuestions[0]);
  };

  const randomizeProposals = (question: Question) => {
    // We need to randomize order of the 3 proposals from current question
    // & push the good answer
    const gameProposals = [];
    const availableProposals = [...question.proposals];

    // Same loop as "randomizeQuestions" function, but for 3 proposals
    for(let i = 0; i < 3; i++) {
      const maxIndex = availableProposals.length - 1;
      const randomIndex = getRandomNumber(0, maxIndex);
      const randomProposal = availableProposals[randomIndex];
      gameProposals.push(randomProposal);
      availableProposals.splice(randomIndex, 1);
    };

    // Push the good answer at a randomIndex
    const maxIndex = gameProposals.length - 1;
    const randomIndex = getRandomNumber(0, maxIndex);
    const answer = question.answer;
    gameProposals.splice(randomIndex, 0, answer);

    // Then, update state
    setCurrentProposals(gameProposals);
  };

  const nextQuestion = () => {
    // Set the next question with it
    const newQuestion = questions[currentIndex];

    // Update state
    setCurrentQuestion(newQuestion);

    // Randomize proposals from this new question
    randomizeProposals(newQuestion);

    setCurrentIndex(currentIndex => currentIndex + 1);
  };

  return (
    <>
      {warningMessage ?
        <section className={styles.warning}>
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        </section>
      :
        <section className={styles.container}>
          <header className={styles.header}>
            <h1 className={styles.title}>
              {quiz.title}
            </h1>
          </header>

          {playing ?
            <GameScreen
              currentQuestion={currentQuestion}
              currentProposals={currentProposals}
              currentIndex={currentIndex}
              nextQuestion={nextQuestion}
              isLogged={isLogged}
              userLogged={userLogged}
              quiz={quiz}
            />
          :
            <main className={styles.presentation}>

              <GameDetails
                quiz={quiz}
              />

              <section className={styles.play}>
                <p className={styles.ready}>
                  Prêt ?
                </p>

                <button
                  className={styles.button}
                  type="button"
                  title="Lancer la partie"
                  aria-label="Lancer la partie"
                  onClick={() => setPlaying(true)}
                >
                  Jouer
                </button>
              </section>

              <QuizComments
                commentsData={commentsData}
                quiz_id={quiz.id}
                userLogged={userLogged}
                isLogged={isLogged}
              />
            </main>
          }

          {userLogged.pseudo !== quizData.creator && isLogged &&
            <>
              {report ?
                <Report
                  user_id={userLogged.id}
                  pseudo={userLogged.pseudo}
                  about={'quiz'}
                  about_id={quizData.id}
                  about_title={quizData.title}
                  setShowReportForm={setReport}
                />
              :
                <button
                  className={styles.report}
                  type="button"
                  title="Signaler ce quiz"
                  aria-label="Signaler ce quiz"
                  onClick={() => setReport(true)}
                >
                  Signaler
                </button>
              }
            </>
          }
        </section>
      }
    </>
  );
};

export default QuizGame;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const title = context.query.slug;

  // Get data from API
  const quizDataFromAPI = await fetch(`${api}/quiz/getOne`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  // Translate to JSON
  const quizData = await quizDataFromAPI.json();

  if(!quizData || quizData.nbOfQuestions < 10) {
    return {
      notFound: true
    };
  } else {

    const quiz_id = quizData.id;

    const questionsDataFromAPI = await fetch(`${api}/question/getAllFromQuiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_id })
    });

    const questionsData = await questionsDataFromAPI.json();

    const commentsDataFromAPI = await fetch(`${api}/comment/getAllFromQuiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_id })
    });

    const commentsData = await commentsDataFromAPI.json();

    return {
      props: {
        quizData,
        questionsData,
        commentsData
      }
    };
  };
};