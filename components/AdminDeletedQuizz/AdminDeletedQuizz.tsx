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
  is_visible: string,
  date: string,
  rate: number,
  reported: boolean
};

type AdminQuizzProps = {
  deletedQuizzData: QuizTypes[]
};

const AdminDeletedQuizz = ({ deletedQuizzData }: AdminQuizzProps) => {

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

        <div className={styles.input}>
          <InputField
            name={'Filtrer les quizz supprimés'}
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
              <li key={quiz.id}>
                <AdminQuizCard
                  id={quiz.id}
                  user_id={quiz.user_id}
                  creator={quiz.creator}
                  title={quiz.title}
                  category={quiz.category}
                  difficulty={quiz.difficulty}
                  lang={quiz.lang}
                  image={quiz.image}
                  is_visible={quiz.is_visible}
                  date={quiz.date}
                  rate={quiz.rate}
                  reported={quiz.reported}
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