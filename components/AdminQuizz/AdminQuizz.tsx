import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../InputField/InputField';
import styles from './AdminQuizz.module.scss';

type QuizTypes = {
  id: number,
  user_id: number,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  is_visible: boolean,
  date: string,
  rate: number,
  reported: boolean
};

type AdminQuizzProps = {
  quizz: QuizTypes[],
  handleModerateQuiz: Function,
  handleDeleteQuiz: Function
};

const AdminQuizz = ({
  quizz,
  handleModerateQuiz,
  handleDeleteQuiz
}: AdminQuizzProps) => {

  const [quizzFilter, setQuizzFilter] = useState<string>('');

  const handleChangeQuizzFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizzFilter(event.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Quizz visibles
        </h2>

        {quizz.length < 10 ? '' : (
          <div
            className={styles.input}
            title='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
            aria-label='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
          >
            <InputField
              name={'Rechercher un quiz...'}
              state={quizzFilter}
              inputID={'quizz-filter'}
              type={'text'}
              isDisabled={false}
              required={true}
              handleFunction={handleChangeQuizzFilter}
            />
          </div>
        )}
      </header>

      <ul className={styles.list}>
        {quizz?.map((quiz: QuizTypes) => {

          const filteredTitle = quiz.title.toLowerCase();
          const filteredCreator = quiz.creator.toLowerCase();
          const filter = quizzFilter.toLocaleLowerCase();

          if(filteredTitle.includes(filter) || filteredCreator.includes(filter)) {
            return (
              <li key={uuidv4()}>
                <AdminQuizCard
                  quiz={quiz}
                  handleModerateQuiz={handleModerateQuiz}
                  handleDeleteQuiz={handleDeleteQuiz}
                />
              </li>
            );
          };
        })}
      </ul>
    </>
  );
};

export default AdminQuizz;