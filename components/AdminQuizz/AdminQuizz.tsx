import { useEffect, useState } from 'react';
import AdminQuizCard from '../AdminQuizCard/AdminQuizCard';
import InputField from '../InputField/InputField';
import Loader from '../Loader/Loader';
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
  is_visible: string,
  date: string,
  rate: number,
  reported: boolean
};

type AdminQuizzProps = {
  quizzData: QuizTypes[]
};

const AdminQuizz = ({ quizzData }: AdminQuizzProps) => {

  const [quizz, setQuizz] = useState<QuizTypes[]>([]);
  const [quizzFilter, setQuizFilter] = useState<string>('');

  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    if(quizzData) {
      setQuizz(quizzData);
      setShowLoader(false);
    };
  }, []);

  const handleChangeQuizzFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
    setQuizFilter(e.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <h2 className={styles.title}>
          Quizz visibles
        </h2>

        <div className={styles.input}>
          <InputField
            name={'Filtrer les quizz'}
            state={quizzFilter}
            inputID={'quizz-filter'}
            type={'text'}
            isDisabled={false}
            required={true}
            handleFunction={handleChangeQuizzFilter}
          />
        </div>
      </header>

      <ul className={styles.list}>
        {quizz?.map((quiz: QuizTypes) => {

          const filteredTitle = quiz.title.toLowerCase();
          const filteredCreator = quiz.creator.toLowerCase();
          const filter = quizzFilter.toLocaleLowerCase();

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

export default AdminQuizz;