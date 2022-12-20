import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo } from 'react';
import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../../InputField/InputField';
import styles from './AdminQuizz.module.scss';

type Props = {
  quizz: Quiz[],
  handleModerateQuiz: (id: string, is_visible: boolean, index: number) => void,
  handleDeleteQuiz: (id: string, index: number) => void
};

const AdminQuizz: FunctionComponent<Props> = ({
  quizz,
  handleModerateQuiz,
  handleDeleteQuiz
}) => {

  const [filter, setFilter] = useState<string>('');

  const displayedQuizz = useMemo(() => {
    if(filter) {
      return quizz.filter((quiz: Quiz) => {
        return quiz.title.toLowerCase().includes(filter.toLowerCase())
        || quiz.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return quizz;

  }, [filter, quizz]);

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Quizz visibles
        </h2>

        <div
          className={styles.input}
          title='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
          aria-label='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
        >
          <InputField
            name={'Rechercher un quiz...'}
            state={filter}
            inputID={'quizz-filter'}
            type={'search'}
            isDisabled={false}
            required={true}
            autoFocus={true}
            setState={setFilter}
          />
        </div>
      </header>

      <ul className={styles.list}>
        {displayedQuizz?.map((quiz: Quiz, index: number) =>
          <li key={uuidv4()}>
            <AdminQuizCard
              quiz={quiz}
              index={index}
              handleModerateQuiz={handleModerateQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
            />
          </li>
        )}
      </ul>
    </>
  );
};

export default AdminQuizz;