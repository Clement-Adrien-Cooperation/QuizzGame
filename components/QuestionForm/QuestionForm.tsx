import { useState } from 'react';
import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import styles from './QuestionForm.module.scss';

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

type QuestionFormProps = {
  question: string,
  answer: string,
  proposition1: string,
  proposition2: string,
  proposition3: string,
  description: string,
  questions: QuestionTypes[],
  setQuestion:Function,
  setAnswer:Function,
  setProposition1:Function,
  setProposition2:Function,
  setProposition3:Function,
  setDescription:Function,
  setQuestions: Function
  handleToggleForm: Function,
  updating: boolean,
  updateIndex: number,
  questionID: number
};

const QuestionForm = ({
  question,
  answer,
  proposition1,
  proposition2,
  proposition3,
  description,
  questions,
  setQuestion,
  setAnswer,
  setProposition1,
  setProposition2,
  setProposition3,
  setDescription,
  setQuestions,
  handleToggleForm,
  updating,
  updateIndex,
  questionID
}:QuestionFormProps) => {

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(question.trim().length > 100) {

      setWarningMessage('La question ne doit pas excéder 100 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setQuestion(e.target.value);
  };

  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(answer.trim().length > 50) {

      setWarningMessage('La réponse ne doit pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');
      
      if(disableButton) {
        setDisableButton(false);
      };
    };

    setAnswer(e.target.value);
  };

  const handleChangeProposition1 = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(proposition1.trim().length > 50) {

      setWarningMessage('Les propositions ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setProposition1(e.target.value);
  };

  const handleChangeProposition2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(proposition2.trim().length > 50) {

      setWarningMessage('Les propositions ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setProposition2(e.target.value);
  };

  const handleChangeProposition3 = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(proposition3.trim().length > 50) {

      setWarningMessage('Les propositions ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setProposition3(e.target.value);
  };

  const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    if(description.trim().length > 500) {

      setWarningMessage('La description ne doit pas excéder 500 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };
    
    setDescription(e.target.value);
  };

  const checkForm = () => {
    
    if (question.length > 100) {

      setWarningMessage('La question ne doit pas excéder 100 caractères');
      setDisableButton(true);

    } else if (description.length > 500) {

      setWarningMessage('La description ne doit pas excéder 500 caractères');
      setDisableButton(true);

    } else if(
      answer.length > 100 ||
      proposition1.length > 100 ||
      proposition2.length > 100 ||
      proposition3.length > 100
    ) {
      setWarningMessage('Les propositions et la réponse ne doivent pas excéder 100 caractères');
      setDisableButton(true);

    } else {
      return true;
    };
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      
    if(checkForm()) {
      
      // Copy array from state
      const previousQuestions = [...questions];

      // push updated propositions in a new array
      const propositions = [proposition1, proposition2, proposition3];

      if(updating) {
        // set up the new question
        const newQuestion = {
          id: questionID,
          quizz_id: 0,
          question,
          answer,
          propositions,
          description
        };

        // If user is currently updating a question, update the good one
        previousQuestions[updateIndex] = newQuestion;

        setQuestions(previousQuestions);

      } else {
        // set up the new question
        const newQuestion = {
          quizz_id: null,
          question,
          answer,
          propositions,
          description
        };
        // If user is creating a new question, add it to previous questions
        const newQuestions = [...previousQuestions, newQuestion];
        
        // Then update the state
        setQuestions(newQuestions);
      };

      handleToggleForm();
    };
  };

  return (
    <>        
      {warningMessage && (
        <Warning
          warningMessage={warningMessage}
          setWarningMessage={setWarningMessage}
        />
      )}

      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >

        <InputField
          name={'Question'}
          state={question}
          inputID={'question'}
          type={'text'}
          isDisabled={false}
          required={true}
          handleFunction={handleChangeQuestion}
        />

        <InputField
          name={'Bonne réponse'}
          state={answer}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          handleFunction={handleChangeAnswer}
        />

        <InputField
          name={'Proposition 1'}
          state={proposition1}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          handleFunction={handleChangeProposition1}
        />

        <InputField
          name={'Proposition 2'}
          state={proposition2}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          handleFunction={handleChangeProposition2}
        />

        <InputField
          name={'Proposition 3'}
          state={proposition3}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          handleFunction={handleChangeProposition3}
        />

        <textarea
          className={styles.area}
          placeholder="Vous pouvez ajouter des précisions ou anecdotes concernant votre question. Elle n'apparaitront qu'après que le joueur ai répondu."
          value={description}
          onChange={handleChangeDescription}
        />

        <button
          className={styles.submit}
          type='submit'
          title='Sauvegarder la question'
          aria-label='Sauvegarder la question'
          disabled={disableButton}
        >
          {updating ? 'Mettre à jour' : 'Ajouter cette question'}
        </button>

        <button
          className={styles.cancel}
          type='button'
          title='Revenir aux questions'
          aria-label='Revenir aux questions'
          onClick={() => handleToggleForm()}
        >
          Annuler
        </button>
      </form>
    </>
  );
};

export default QuestionForm;