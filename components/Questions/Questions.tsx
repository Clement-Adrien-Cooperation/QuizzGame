import { useState } from 'react';
import QuestionForm from '../QuestionForm/QuestionForm';
import styles from './Questions.module.scss';

type QuestionsProps = {
  questions: QuestionTypes[],
  setQuestions: Function
};

type QuestionTypes = {

};

const Questions = ({
  questions,
  setQuestions
} :QuestionsProps) => {

  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <section className={styles.questions}>
      
    </section>
  );
};

export default Questions;