import { useState } from 'react';
import InputField from '../InputField/InputField';
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

  // State to know if user want to create or update a question
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateIndex, setUpdateIndex] = useState<number>(0);
  const [questionID, setQuestionID] = useState<number>(0);

  const [questionFilter, setQuestionFilter] = useState<string>('');

  const updateQuestion = (questionData: QuestionTypes) => {
    setQuestionID(questionData.id);
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

  const handleChangeQuestionFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionFilter(e.target.value);
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
          updating={updating}
          updateIndex={updateIndex}
          questionID={questionID}
        />
      ) : (
        <section className={styles.questions}>
          {questions.length > 0 && (
            <>
              <section className={styles.header}>
                
                <h2 className={styles.title}>
                  Questions
                </h2>

                <button
                  className={styles.button}
                  type='button'
                  title='Ajouter une nouvelle question'
                  aria-label='Ajouter une nouvelle question'
                  onClick={() => {
                    setUpdating(false);
                    handleToggleForm();
                  }}
                >
                  Ajouter une question
                </button>
              </section>

              {questions.length > 5 && (
                <div
                  className={styles.input}
                  title='Vous pouvez filtrer avec la questions en elle-même ou avec la bonne réponse'
                  aria-label='Vous pouvez filtrer avec la questions en elle-même ou avec la bonne réponse'
                >
                  <InputField
                    name={'Filtrer les questions'}
                    state={questionFilter}
                    inputID={'question-filter'}
                    type={'text'}
                    isDisabled={false}
                    required={true}
                    handleFunction={handleChangeQuestionFilter}
                  />
                </div>
              )}

              <ul className={styles.list}>
                {questions.map((question, index) => {

                  const filteredQuestion = question.question.toLowerCase();
                  const filteredAnswer = question.answer.toLowerCase();
                  const filter = questionFilter.toLocaleLowerCase();

                  if(filteredQuestion.includes(filter) || filteredAnswer.includes(filter)) {

                    return (
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
                          setUpdating={setUpdating}
                          questionIndex={index}
                          setUpdateIndex={setUpdateIndex}
                        />
                      </li>
                    );
                  };
                })}
              </ul>
            </>
          )}
          <button
            className={styles.button}
            type='button'
            title='Ajouter une nouvelle question'
            aria-label='Ajouter une nouvelle question'
            onClick={() => {
              setUpdating(false);
              handleToggleForm();
            }}
          >
            Ajouter une question
          </button>
        </section>
      )}
    </section>
  );
};

export default Questions;