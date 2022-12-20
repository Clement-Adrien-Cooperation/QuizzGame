import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useState, useMemo } from 'react';
import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../../InputField/InputField';
import styles from './AdminDeletedQuizz.module.scss';

type Props = {
  deletedQuizz: Quiz[],
  handleModerateQuiz: (id: string, is_visible: boolean) => void,
  handleDeleteQuiz: (id: string) => void
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

  }, [filter]);

  return (
    <>
      <header className={styles.header}>
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
              type={'text'}
              isDisabled={false}
              required={true}
              autoFocus={false}
              setState={setFilter}
            />
          </div>
        }
      </header>

      <ul className={styles.list}>
        {displayedQuizz.map((quiz: Quiz) =>

          <li key={uuidv4()}>
            <AdminQuizCard
              quiz={quiz}
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