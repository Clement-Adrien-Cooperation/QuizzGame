import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../InputField/InputField';
import Loader from '../Loader/Loader';
import styles from './AdminDeletedQuizz.module.scss';

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
  deletedQuizzData: QuizTypes[],
  handleModerateQuiz: Function,
  handleDeleteQuiz: Function
};

const AdminDeletedQuizz = ({
  deletedQuizzData,
  handleModerateQuiz,
  handleDeleteQuiz
}: AdminQuizzProps) => {

  const [deletedQuizz, setDeletedQuizz] = useState<QuizTypes[]>([]);
  const [deletedQuizzFilter, setDeletedQuizzFilter] = useState<string>('');

  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    if(deletedQuizzData) {
      setDeletedQuizz(deletedQuizzData);
      setShowLoader(false);
    };
  }, []);

  const handleChangeDeletedQuizzFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeletedQuizzFilter(e.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Quizz supprimés
        </h2>

        <div
          className={styles.input}
          title='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
          aria-label='Vous pouvez trouver un quiz avec son titre ou le pseudo de son createur'
        >
          <InputField
            name={'Rechercher dans la corbeille...'}
            state={deletedQuizzFilter}
            inputID={'deleted-quizz-filter'}
            type={'text'}
            isDisabled={false}
            required={true}
            handleFunction={handleChangeDeletedQuizzFilter}
          />
        </div>
      </header>

      <ul className={styles.list}>
        {deletedQuizz?.map((quiz: QuizTypes) => {

          const filteredTitle = quiz.title.toLowerCase();
          const filteredCreator = quiz.creator.toLowerCase();
          const filter = deletedQuizzFilter.toLocaleLowerCase();

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

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default AdminDeletedQuizz;