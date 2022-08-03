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

  return (
    <section className={styles.container}>

      {questions.length < 1 ? '' : (

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
              />
            </li>
          )}
        </ul>
      )}

      {showForm ? (
        <QuestionForm
          questions={questions}
          setQuestions={setQuestions}
          setShowForm={setShowForm}
        />
      ) : (
        <button
          className={styles.button}
          type='button'
          onClick={() => setShowForm(true)}
        >
          Ajouter une question
        </button>
      )}
    </section>
  );
};

export default Questions;