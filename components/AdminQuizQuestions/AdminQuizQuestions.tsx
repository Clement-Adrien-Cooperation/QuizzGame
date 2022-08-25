import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AdminQuestionCard from '../AdminQuestionCard/AdminQuestionCard';
import InputField from '../InputField/InputField';
import Loader from '../Loader/Loader';
import styles from './AdminQuizQuestions.module.scss';

type QuestionTypes = {
  id: string,
  quiz_id: string,
  question: string,
  description: string,
  proposals: string[],
  answer: string,
  reported?: boolean,
  reportMessage?: string
};

type AdminQuizQuestionsProps = {
  id: string
};

const AdminQuizQuestions = ({
  id
}: AdminQuizQuestionsProps) => {

  const [questions, setQuestions] = useState<QuestionTypes[]>([]);
  const [questionFilter, setQuestionFilter] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    getQuestionsFromQuiz();
  }, []);

  const getQuestionsFromQuiz = async () => {

    await fetch('/api/question/getAllFromQuiz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_id: id })
    })
    .then(async(res) => {
      
      const data = await res.json();

      console.log(data);
      
      setQuestions(data);
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleChangeQuestionFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionFilter(e.target.value);
  };

  return (
    <>
      {questions.length < 10 ? '' : (
        <div
          className={styles.input}
          title="Filtrer avec la question ou la bonne réponse"
          aria-label="Filtrer avec la question ou la bonne réponse"
        >
          <InputField
            name="Chercher une question"
            state={questionFilter}
            inputID="question-filter"
            type="text"
            isDisabled={false}
            required={true}
            autoFocus={true}
            handleFunction={handleChangeQuestionFilter}
          />
        </div>
      )}

      <ul className={styles.list}>
        {questions?.map(question => {

          const filteredQuestion = question.question.toLowerCase();
          const filteredAnswer = question.answer.toLocaleLowerCase();
          const filter = questionFilter.toLocaleLowerCase();

          if(filteredQuestion.includes(filter) || filteredAnswer.includes(filter)) {
            return (
              <li key={uuidv4()}>
                <AdminQuestionCard
                  question={question}
                />
              </li>
            );
          };
        })}
      </ul>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default AdminQuizQuestions;