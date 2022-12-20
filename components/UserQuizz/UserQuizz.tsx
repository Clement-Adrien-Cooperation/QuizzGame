import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import type { Quiz, User } from '@prisma/client';
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import UserQuizCard from '../UserQuizCard/UserQuizCard';
import styles from './UserQuizz.module.scss';
import InputField from '../InputField/InputField';

type Props = {
  quizz: Quiz[],
  userLogged: User,
  getQuizzFromUser: () => void,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const UserQuizz: FunctionComponent<Props> = ({
  quizz,
  userLogged,
  getQuizzFromUser,
  setShowLoader
}) => {

  const [filter, setFilter] = useState<string>('');

  const displayedQuizz = useMemo(() => {
    if(filter) {
      return quizz.filter((quiz: Quiz) => {
        return quiz.title.toLowerCase().includes(filter.toLowerCase()) ||
        quiz.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return quizz;

  }, [quizz, filter]);

  return (
    <>
      <h2 className={styles.title}>
        Mes Quizz
      </h2>

      <div
        className={styles.filter}
        title='Vous pouvez filtrer vos quizz grâce à leur titre ou leur catégorie'
        aria-label='Vous pouvez filtrer vos quizz grâce à leur titre ou leur catégorie'
      >
        <InputField
          name={'Filtrer mes quiz...'}
          state={filter}
          inputID={'user-quizz-filter'}
          type={'search'}
          isDisabled={false}
          required={true}
          autoFocus={true}
          setState={setFilter}
        />
      </div>

      <ul className={styles.list}>

        {displayedQuizz?.map((quiz: Quiz) =>
          <li key={uuidv4()}>
            <UserQuizCard
              quiz={quiz}
              userLogged={userLogged}
              getQuizzFromUser={getQuizzFromUser}
              setShowLoader={setShowLoader}
            />
          </li>
        )}
      </ul>
    </>
  );
};

export default UserQuizz;