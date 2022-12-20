import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo } from 'react';
import styles from './AdminDeletedQuizz.module.scss';

import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../../InputField/InputField';

type Props = {
  deletedQuizz: Quiz[],
  handleModerateQuiz: (id: string, is_visible: boolean, index: number) => void,
  handleDeleteQuiz: (id: string, index: number) => void
};

const AdminDeletedQuizz: FunctionComponent<Props> = ({
  deletedQuizz,
  handleModerateQuiz,
  handleDeleteQuiz
}) => {

  const [filter, setFilter] = useState<string>('');

  const displayedQuizz = useMemo(() => {
    if(filter) {
      return deletedQuizz.filter((quiz: Quiz) => {
        return quiz.title.toLowerCase().includes(filter.toLowerCase()) ||
        quiz.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return deletedQuizz;

  }, [filter, deletedQuizz]);

  return (
    <>
      <header>
        <h2 className={styles.title}>
          Quizz supprimés
        </h2>

        {deletedQuizz?.length > 10 &&
          <div
            className={styles.input}
            title='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
            aria-label='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
          >
            <InputField
              name={'Rechercher dans la corbeille...'}
              state={filter}
              inputID={'deleted-quizz-filter'}
              type={'search'}
              isDisabled={false}
              required={true}
              autoFocus={false}
              setState={setFilter}
            />
          </div>
        }
      </header>

      <ul className={styles.list}>
        {displayedQuizz.map((quiz: Quiz, index: number) =>

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

export default AdminDeletedQuizz;