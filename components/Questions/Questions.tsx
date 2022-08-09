import { useState } from 'react';
import QuestionCard from '../QuestionCard/QuestionCard';
import QuestionForm from '../QuestionForm/QuestionForm';
import styles from './Questions.module.scss';

type QuestionsProps = {
  questions: QuestionTypes[],
  setQuestions: Function
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

const Questions = ({
  questions,
  setQuestions
} :QuestionsProps) => {

  const [showForm, setShowForm] = useState<boolean>(false);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [proposition1, setProposition1] = useState<string>('');
  const [proposition2, setProposition2] = useState<string>('');
  const [proposition3, setProposition3] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const updateQuestion = (questionData: QuestionTypes) => {
    setQuestion(questionData.question);
    setAnswer(questionData.answer);
    setProposition1(questionData.propositions[0]);
    setProposition2(questionData.propositions[1]);
    setProposition3(questionData.propositions[2]);
    setDescription(questionData.description);

    handleToggleForm();
  };

  const handleToggleForm = () => {
    if(showForm) {
      setQuestion('');
      setAnswer('');
      setProposition1('');
      setProposition2('');
      setProposition3('');
      setDescription('');

      setShowForm(false);
    } else {
      setShowForm(true);
    };
  };

  return (
    <section className={styles.container}>

      {showForm ? (
        <QuestionForm
          question={question}
          answer={answer}
          proposition1={proposition1}
          proposition2={proposition2}
          proposition3={proposition3}
          description={description}
          questions={questions}
          setQuestion={setQuestion}
          setAnswer={setAnswer}
          setProposition1={setProposition1}
          setProposition2={setProposition2}
          setProposition3={setProposition3}
          setDescription={setDescription}
          setQuestions={setQuestions}
          handleToggleForm={handleToggleForm}
        />
      ) : (
        <>
          {questions.length > 0 && (

            <ul className={styles.list}>
              {questions.map((question, index) =>

                <li key={index}>
                  <QuestionCard
                    id={question.id}
                    quizz_id={question.quizz_id}
                    question={question.question}
                    answer={question.answer}
                    propositions={question.propositions}
                    description={question.description}
                    setQuestions={setQuestions}
                    updateQuestion={updateQuestion}
                  />
                </li>
              )}
            </ul>
          )}
          <button
            className={styles.button}
            type='button'
            onClick={handleToggleForm}
          >
            Ajouter une question
          </button>
        </>
      )}
    </section>
  );
};

export default Questions;