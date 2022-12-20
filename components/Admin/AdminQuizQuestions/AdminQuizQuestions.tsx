import type { Question } from '@prisma/client';
import type { FunctionComponent } from 'react';
import { useEffect, useState, useMemo } from 'react';
import { api } from '../../../api/api';
import { v4 as uuidv4 } from 'uuid';
import AdminQuestionCard from '../AdminQuestionCard/AdminQuestionCard';
import InputField from '../../InputField/InputField';
import Loader from '../../Loader/Loader';
import styles from './AdminQuizQuestions.module.scss';

type Props = {
  id: string
};

const AdminQuizQuestions: FunctionComponent<Props> = ({
  id
}) => {

  const [questions, setQuestions] = useState<Question[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    getQuestionsFromQuiz();
  }, []);

  const getQuestionsFromQuiz = async () => {

    await fetch(`${api}/question/getAllFromQuiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_id: id })
    })
    .then(async(res) => {

      const data = await res.json();

      setQuestions(data);
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const displayedQuestions = useMemo(() => {
    if(filter) {
      return questions.filter((question: Question) => {
        return question.question.toLowerCase().includes(filter.toLowerCase())
        || question.answer.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return questions;

  }, [filter, questions]);

  return (
    <section className={styles.questions}>
      {questions.length > 10 &&
        <div
          className={styles.input}
          title="Filtrer avec la question ou la bonne réponse"
          aria-label="Filtrer avec la question ou la bonne réponse"
        >
          <InputField
            name="Chercher une question"
            state={filter}
            inputID="question-filter"
            type="text"
            isDisabled={false}
            required={true}
            autoFocus={true}
            setState={setFilter}
          />
        </div>
      }

      <ul className={styles.list}>
        {displayedQuestions?.map((question: Question) =>
          <li key={uuidv4()}>
            <AdminQuestionCard
              question={question}
            />
          </li>
        )}
      </ul>

      {showLoader && (
        <Loader />
      )}
    </section>
  );
};

export default AdminQuizQuestions;