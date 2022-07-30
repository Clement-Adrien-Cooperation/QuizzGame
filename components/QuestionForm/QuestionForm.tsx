import { useState } from 'react';
import InputField from '../InputField/InputField';
import Warning from '../Warning/Warning';
import styles from './QuestionForm.module.scss';

const QuestionForm = () => {

  const [question, setQuestion] = useState<string>('bite');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (question.trim().length > 50) {

      setWarningMessage('Votre question ne doit pas excéder 50 caractères');
    } else {
      setWarningMessage('');
    };
    setQuestion(e.target.value);
  };

  const checkForm = () => {
    
    // If question doesn't includes a '?'
    if(!question.trim().includes('?')) {

      // We add it
      setQuestion(question + ' ?');

    } else if (question.trim().length > 50) {

      setWarningMessage('Votre question ne doit pas excéder 50 caractères');
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

      <form className={styles.form}>

        <InputField
          name={'Question'}
          state={question}
          inputID={'question'}
          type={'text'}
          isDisabled={false}
          handleFunction={handleChangeQuestion}
        />


        <textarea
          className={styles.area}
          placeholder='Vous pouvez ajouter des précisions ou anecdotes concernant votre question, qui apparaitront après que le joueur ai répondu'
        />
    </form>
    </>

  );
};

export default QuestionForm;