import { Question } from '@prisma/client';
import { ChangeEvent, Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../InputField/InputField';
import QuestionCard from './QuestionCard/QuestionCard';
import QuestionForm from './QuestionForm/QuestionForm';
import styles from './Questions.module.scss';

type Props = {
  questions: Question[],
  setQuestions: Dispatch<SetStateAction<Question[]>>
};

const Questions: FunctionComponent<Props> = ({
  questions,
  setQuestions
}) => {

  const [showForm, setShowForm] = useState<boolean>(false);

  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [proposal1, setProposal1] = useState<string>('');
  const [proposal2, setProposal2] = useState<string>('');
  const [proposal3, setProposal3] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // State to know if user want to create or update a question
  const [updating, setUpdating] = useState<boolean>(false);
  const [updateIndex, setUpdateIndex] = useState<number>(0);
  const [questionID, setQuestionID] = useState<string>('');

  const [questionFilter, setQuestionFilter] = useState<string>('');

  const updateQuestion = (questionData: Question) => {
    setQuestionID(questionData.id);
    setQuestion(questionData.question);
    setAnswer(questionData.answer);
    setProposal1(questionData.proposals[0]);
    setProposal2(questionData.proposals[1]);
    setProposal3(questionData.proposals[2]);

    if(description) {
      setDescription(questionData.description);
    };

    handleToggleForm();
  };

  const handleToggleForm = () => {
    if(showForm) {
      setQuestion('');
      setAnswer('');
      setProposal1('');
      setProposal2('');
      setProposal3('');
      setDescription('');

      setShowForm(false);
    } else {
      setShowForm(true);
    };
  };

  const handleChangeQuestionFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFilter(event.target.value);
  };

  return (
    <section className={styles.container}>

      {showForm ?
        <QuestionForm
          question={question}
          setQuestion={setQuestion}
          answer={answer}
          proposal1={proposal1}
          proposal2={proposal2}
          proposal3={proposal3}
          description={description}
          questions={questions}
          setQuestions={setQuestions}
          setAnswer={setAnswer}
          setProposal1={setProposal1}
          setProposal2={setProposal2}
          setProposal3={setProposal3}
          setDescription={setDescription}
          handleToggleForm={handleToggleForm}
          updating={updating}
          updateIndex={updateIndex}
          questionID={questionID}
        />
      :
        <section className={styles.questions}>
          {questions.length > 0 &&
            <>
              <section className={styles.header}>
                  
                <h2 className={styles.title}>
                  {questions.length} {questions.length < 2 ? 'question' : 'questions'}
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
              
              {questions.length < 10 &&
                <span className={styles.warning}>
                  Pour être jouable, votre quiz doit contenir au moins 10 questions
                </span>
              }


              {questions.length > 10 &&
                <div
                  className={styles.input}
                  title='Vous pouvez filtrer avec la questions en elle-même ou avec la bonne réponse'
                  aria-label='Vous pouvez filtrer avec la questions en elle-même ou avec la bonne réponse'
                >
                  <InputField
                    name={'Rechercher une question'}
                    state={questionFilter}
                    inputID={'question-filter'}
                    type={'text'}
                    isDisabled={false}
                    required={true}
                    autoFocus={true}
                    handleFunction={handleChangeQuestionFilter}
                  />
                </div>
              }

              <ul className={styles.list}>
                {questions?.map((question, index) => {

                  const filteredQuestion = question.question.toLowerCase();
                  const filteredAnswer = question.answer.toLowerCase();
                  const filter = questionFilter.toLocaleLowerCase();

                  if(filteredQuestion.includes(filter) || filteredAnswer.includes(filter)) {

                    return (
                      <li key={uuidv4()}>
                        <QuestionCard
                          questions={questions}
                          setQuestions={setQuestions}
                          id={question.id}
                          quiz_id={question.quiz_id}
                          question={question.question}
                          answer={question.answer}
                          proposals={question.proposals}
                          description={question.description}
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
          }

          {questions.length < 1 &&
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
          }
        </section>
      }
    </section>
  );
};

export default Questions;