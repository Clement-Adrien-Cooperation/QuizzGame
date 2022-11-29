import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import type { Quiz, User } from '@prisma/client';
import { useState } from 'react';
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

  const [quizzFilter, setQuizzFilter] = useState<string>('');

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
          state={quizzFilter}
          inputID={'user-quizz-filter'}
          type={'text'}
          isDisabled={false}
          required={true}
          autoFocus={true}
          setState={setQuizzFilter}
        />
      </div>

      <ul className={styles.list}>

        {quizz?.map((quiz: Quiz) => {

          const filter = quizzFilter.toLowerCase();
          const title = quiz.title.toLowerCase();
          const category = quiz.category.toLowerCase();

          if(title.includes(filter) || category.includes(filter)) {
            return (
              <li key={uuidv4()}>
                <UserQuizCard
                  quiz={quiz}
                  userLogged={userLogged}
                  getQuizzFromUser={getQuizzFromUser}
                  setShowLoader={setShowLoader}
                />
              </li>
            );
          }
        })}
      </ul>
    </>
  );
};

export default UserQuizz;