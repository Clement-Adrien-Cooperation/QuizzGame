import { Quiz, User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Loader from '../../components/Loader/Loader';
import UserProfileQuizCard from '../../components/UserProfileQuizCard/UserProfileQuizCard';
import styles from '../../styles/UserProfile.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User
};

const UserProfile: NextPage<Props> = ({
  isLogged,
  userLogged
}) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<Quiz[]>([]);
  const [quizzFilter, setQuizzFilter] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(true);
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    } else {
      router.push('/');
    };

    document.title = `Profil de ${router.query.slug} - s'Quizz Game`;
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

  const handleChangeQuizzFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setQuizzFilter(event.target.value);
  };

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Page de {router.query.slug}
        </h1>
      </header>

      {userQuizz ? 
      
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

            {userQuizz?.map((quiz: Quiz, index: number) => {
              
              const filteredTitle = quiz.title.toLowerCase();
              const filteredCategory = quiz.category.toLowerCase();
              const filter = quizzFilter.toLowerCase();

              if(quiz.nbOfQuestions > 0 && filteredTitle.includes(filter)
              || quiz.nbOfQuestions > 0 && filteredCategory.includes(filter)
              ) {
                return (
                  <li key={index}>
                    <UserProfileQuizCard
                      quiz={quiz}
                    />
                  </li>
                );
              };
            })}
          </ul>
        </section>
      :
        <section className={styles.container}>
          <p className={styles.no_quiz}>
            {router.query.slug} n'a créé aucun quiz pour le moment
          </p>
        </section>
      }

      {showLoader && (
        <Loader />
      )}
    </>
  );
};

export default UserProfile;