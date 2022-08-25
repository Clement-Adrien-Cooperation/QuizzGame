import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Loader from '../../components/Loader/Loader';
import UserProfileQuizCard from '../../components/UserProfileQuizCard/UserProfileQuizCard';
import styles from '../../styles/UserProfile.module.scss';

type QuizTypes = {
  id: string,
  user_id: string,
  creator: string,
  title: string,
  category: string,
  difficulty: string,
  lang: string,
  image: string,
  nbOfQuestions: number,
  is_visible: boolean,
  date: string,
  rate: number,
  reported: boolean,
  reportMessage?: string[]
};

const UserProfile: NextPage = ({ isLogged, userLogged }: any) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<QuizTypes[]>([]);
  const [quizzFilter, setQuizzFilter] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(true);

  useEffect(() => {
    if(isLogged) {
      if(userLogged.is_banished === true) {
        router.push('/banned');
      };
    };

    getQuizzFromUser();
  }, []);

  const getQuizzFromUser = async () => {
    
    const pseudo = router.query.slug;

    await fetch('/api/quiz/getUserQuizz', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pseudo })
    })
    .then(async(res) => {
      const data = await res.json();
      setUserQuizz(data);
    })
    .then(() => {
      setShowLoader(false);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleChangeQuizzFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizzFilter(e.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Quizz de {router.query.slug}
        </h1>
      </header>
      
      <section className={styles.container}>

        {userQuizz.length < 10 ? '' :
          <div className={styles.input}>
            <InputField
              name={'Chercher un quiz...'}
              state={quizzFilter}
              inputID={'quizz-filter'}
              type={'text'}
              isDisabled={false}
              required={true}
              autoFocus={true}
              handleFunction={handleChangeQuizzFilter}
            />
          </div>
        }

        <ul className={styles.list}>

          {userQuizz.map((quiz: QuizTypes, index: number) => {
            
            const filteredTitle = quiz.title.toLowerCase();
            const filteredCategory = quiz.category.toLowerCase();
            const filter = quizzFilter.toLowerCase();

            if(quiz.nbOfQuestions > 5 && filteredTitle.includes(filter)
            || quiz.nbOfQuestions > 5 && filteredCategory.includes(filter)
            ) {
              return (
                <li key={index}>
                  <UserProfileQuizCard
                    title={quiz.title}
                    category={quiz.category}
                    difficulty={quiz.difficulty}
                    nbOfQuestions={quiz.nbOfQuestions}
                    date={quiz.date}
                    rate={quiz.rate}
                  />
                </li>
              );
            };
          })}
        </ul>
      </section>

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default UserProfile;