import { useState } from 'react';
import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import styles from './QuestionForm.module.scss';

type QuestionTypes = {
  id: string,
  quizz_id: string,
  question: string,
  description: string,
  proposals: string[],
  answer: string,
  reported?: boolean,
  reportMessage?: string
};

type QuestionFormProps = {
  question: string,
  answer: string,
  proposal1: string,
  proposal2: string,
  proposal3: string,
  description: string,
  questions: QuestionTypes[],
  setQuestion:Function,
  setAnswer:Function,
  setProposal1:Function,
  setProposal2:Function,
  setProposal3:Function,
  setDescription:Function,
  setQuestions: Function
  handleToggleForm: Function,
  updating: boolean,
  updateIndex: number,
  questionID: string
};

const QuestionForm = ({
  question,
  answer,
  proposal1,
  proposal2,
  proposal3,
  description,
  questions,
  setQuestion,
  setAnswer,
  setProposal1,
  setProposal2,
  setProposal3,
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

  const handleChangeProposal1 = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(proposal1.trim().length > 50) {

      setWarningMessage('Les proposals ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setProposal1(e.target.value);
  };

  const handleChangeProposal2 = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(proposal2.trim().length > 50) {

      setWarningMessage('Les proposals ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setProposal2(e.target.value);
  };

  const handleChangeProposal3 = (e: React.ChangeEvent<HTMLInputElement>) => {

    if(proposal3.trim().length > 50) {

      setWarningMessage('Les proposals ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };

    setProposal3(e.target.value);
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
      proposal1.length > 100 ||
      proposal2.length > 100 ||
      proposal3.length > 100
    ) {
      setWarningMessage('Les proposals et la réponse ne doivent pas excéder 100 caractères');
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

      // push updated proposals in a new array
      const proposals = [proposal1, proposal2, proposal3];

      if(updating) {
        // set up the new question
        const newQuestion = {
          id: questionID,
          quizz_id: '',
          question,
          answer,
          proposals,
          description
        };

        // If user is currently updating a question, update the good one
        previousQuestions[updateIndex] = newQuestion;

        setQuestions(previousQuestions);

      } else {
        // set up the new question
        const newQuestion = {
          quizz_id: '',
          question,
          answer,
          proposals,
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
          autoFocus={true}
          handleFunction={handleChangeQuestion}
        />

        <InputField
          name={'Bonne réponse'}
          state={answer}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          handleFunction={handleChangeAnswer}
        />

        <InputField
          name={'Proposition n°1'}
          state={proposal1}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          handleFunction={handleChangeProposal1}
        />

        <InputField
          name={'Proposition n°2'}
          state={proposal2}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          handleFunction={handleChangeProposal2}
        />

        <InputField
          name={'Proposition n°3'}
          state={proposal3}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          handleFunction={handleChangeProposal3}
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
          title='Annuler cette question'
          aria-label='Annuler cette question'
          onClick={() => handleToggleForm()}
        >
          Annuler
        </button>
      </form>
    </>
  );
};

export default QuestionForm;