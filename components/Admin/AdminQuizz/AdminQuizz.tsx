import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../../InputField/InputField';
import styles from './AdminQuizz.module.scss';

type Props = {
  quizz: Quiz[],
  handleModerateQuiz: (id: string, is_visible: boolean) => void,
  handleDeleteQuiz: (id: string) => void
};

const AdminQuizz: FunctionComponent<Props> = ({
  quizz,
  handleModerateQuiz,
  handleDeleteQuiz
}) => {

  const [quizzFilter, setQuizzFilter] = useState<string>('');

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Quizz visibles
        </h2>

        {quizz?.length > 10 &&
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
              autoFocus={true}
              setState={setQuizzFilter}
            />
          </div>
        }
      </header>

      <ul className={styles.list}>
        {quizz?.map((quiz: Quiz) => {

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