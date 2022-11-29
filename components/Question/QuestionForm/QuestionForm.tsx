import type { Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react';
import type { Question } from '@prisma/client';
import { useState, useEffect } from 'react';
import InputField from '../../InputField/InputField';
import Warning from '../../Warning/Warning';
import styles from './QuestionForm.module.scss';
import TextArea from '../../TextArea/TextArea';

type Props = {
  question: string,
  answer: string,
  proposal1: string,
  proposal2: string,
  proposal3: string,
  description: string,
  questions: Question[],
  setQuestions: Dispatch<SetStateAction<Question[]>>
  setQuestion: Dispatch<SetStateAction<string>>,
  setAnswer: Dispatch<SetStateAction<string>>,
  setProposal1: Dispatch<SetStateAction<string>>,
  setProposal2: Dispatch<SetStateAction<string>>,
  setProposal3: Dispatch<SetStateAction<string>>,
  setDescription: Dispatch<SetStateAction<string>>,
  handleToggleForm: () => void,
  updating: boolean,
  updateIndex: number,
  questionID: string
};

const QuestionForm: FunctionComponent<Props> = ({
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
}) => {

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if(question.length > 100) {

      setWarningMessage('La question ne doit pas excéder 100 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };
  }, [question]);

  useEffect(() => {
    if(answer.length > 50
    || proposal1.length > 50
    || proposal2.length > 50
    || proposal3.length > 50) {

      setWarningMessage('La réponse et les propositions ne doivent pas excéder 50 caractères');
      setDisableButton(true);

    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };
  }, [answer, proposal1, proposal2, proposal3]);

  useEffect(() => {
    if(description.length > 500) {
      setWarningMessage('La description ne doit pas excéder 500 caractères');
      setDisableButton(true);
    } else {
      setWarningMessage('');

      if(disableButton) {
        setDisableButton(false);
      };
    };
  }, [description]);

  const checkForm = () => {

    if(question.trim() === ''
    || answer.trim() === ''
    || proposal1.trim() === ''
    || proposal2.trim() === ''
    || proposal3.trim() === '') {

      setWarningMessage('La question, la bonne réponse et les propositions doivent être valides');

    } else if(question.length > 100) {

      setWarningMessage('La question ne doit pas excéder 100 caractères');
      setDisableButton(true);

    } else if(description.length > 500) {

      setWarningMessage('La description ne doit pas excéder 500 caractères');
      setDisableButton(true);

    } else if(
      answer.length > 100 ||
      proposal1.length > 100 ||
      proposal2.length > 100 ||
      proposal3.length > 100
    ) {
      setWarningMessage('Les proposositions et la réponse ne doivent pas excéder 100 caractères');
      setDisableButton(true);
    } else {
      return true;
    };
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(checkForm()) {
      // Copy array from state
      const previousQuestions = [...questions];

      // push updated proposals in a new array
      const proposals = [proposal1.trim(), proposal2.trim(), proposal3.trim()];

      if(updating) {
        // set up the new question
        const newQuestion: Question = {
          id: questionID,
          quiz_id: '',
          user_id: '',
          question: question.trim(),
          answer: answer.trim(),
          proposals,
          description: description.trim()
        };

        // If user is currently updating a question, update the good one
        previousQuestions[updateIndex] = newQuestion;

        setQuestions(previousQuestions);

      } else {
        // set up the new question
        const newQuestion: Question = {
          id: '',
          quiz_id: '',
          user_id: '',
          question: question.trim(),
          answer: answer.trim(),
          proposals,
          description: description.trim()
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
      {warningMessage &&
        <Warning
          warningMessage={warningMessage}
          setWarningMessage={setWarningMessage}
        />
      }

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
          setState={setQuestion}
        />

        <InputField
          name={'Bonne réponse'}
          state={answer}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          setState={setAnswer}
        />

        <InputField
          name={'Proposition n°1'}
          state={proposal1}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          setState={setProposal1}
        />

        <InputField
          name={'Proposition n°2'}
          state={proposal2}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          setState={setProposal2}
        />

        <InputField
          name={'Proposition n°3'}
          state={proposal3}
          inputID={'answer'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={false}
          setState={setProposal3}
        />

        <TextArea
          inputID={"description"}
          label={"Précisions / anecdotes"}
          state={description}
          setState={setDescription}
          title={"Vous pouvez ajouter des précisions ou anecdotes concernant votre question. Elle n'apparaitront qu'après que le joueur ai répondu."}
          required={false}
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
          onClick={handleToggleForm}
        >
          Annuler
        </button>
      </form>
    </>
  );
};

export default QuestionForm;