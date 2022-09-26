import type { Quiz, User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import { useEffect, useState } from 'react';
import InputField from '../../components/InputField/InputField';
import ProfileQuizCard from '../../components/ProfileQuizCard/ProfileQuizCard';
import styles from '../../styles/UserProfile.module.scss';
import Report from '../../components/Report/Report';

type Props = {
  isLogged: boolean,
  userLogged: User,
  userData: User,
  userQuizzData: Quiz[],
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const UserProfile: NextPage<Props> = ({
  isLogged,
  userLogged,
  userData,
  userQuizzData,
  setShowLoader
}) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<Quiz[]>([]);
  const [quizzFilter, setQuizzFilter] = useState<string>('');
  const [report, setReport] = useState<boolean>(false);

  useEffect(() => {

    document.title = `Profil de ${router.query.slug} - s'Quizz Game`;
    setUserQuizz(userQuizzData);

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      };
    };
  }, []);

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

          {userQuizz?.length > 10 &&
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
              || quiz.nbOfQuestions > 0 && filteredCategory.includes(filter)) {
                return (
                  <li key={index}>
                    <ProfileQuizCard
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

      {userLogged.pseudo !== userData.pseudo && isLogged &&
        <>
          {report ?
            <Report
              pseudo={userLogged.pseudo}
              about={'user'}
              about_id={userData.id}
              about_title={userData.pseudo}
              setShowReportForm={setReport}
              setShowLoader={setShowLoader}
            />
          :
            <button
              className={styles.report}
              type="button"
              title="Signaler cet utilisateur"
              aria-label="Signaler cet utilisateur"
              onClick={() => setReport(true)}
            >
              Signaler
            </button>
          }
        </>
      }
    </>
  );
};

export default UserProfile;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const pseudo = context.query.slug;

  const userDataFromAPI = await fetch(`${api}/user/getSafeInfos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo })
  });
  const userData = await userDataFromAPI.json();

  const userQuizzDataFromAPI = await fetch(`${api}/quiz/getUserQuizz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pseudo })
  });
  const userQuizzData = await userQuizzDataFromAPI.json();

  return {
    props: {
      userData,
      userQuizzData
    }
  };
};