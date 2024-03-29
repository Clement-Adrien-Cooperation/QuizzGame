import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import type { Played, Quiz, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import { useEffect, useState, useMemo } from 'react';
import InputField from '../../components/InputField/InputField';
import ProfileQuizCard from '../../components/ProfileQuizCard/ProfileQuizCard';
import styles from '../../styles/UserProfile.module.scss';
import Report from '../../components/Report/Report';
import PlayedQuizz from '../../components/PlayedQuizz/PlayedQuizz';

type Props = {
  isLogged: boolean,
  userLogged: User,
  userData: User,
  userQuizzData: Quiz[],
  playedData: Played[],
  setPageTitle: Dispatch<SetStateAction<string>>
};

const UserProfile: NextPage<Props> = ({
  isLogged,
  userLogged,
  userData,
  userQuizzData,
  playedData,
  setPageTitle
}) => {

  const router = useRouter();

  const [userQuizz, setUserQuizz] = useState<Quiz[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [report, setReport] = useState<boolean>(false);

  useEffect(() => {

    if(isLogged && userLogged.is_banished) {
      router.push('/banned');
    } else {
      if(userData.is_banished) {
        router.push('/404');
      } else {
        setPageTitle(`Profil de ${router.query.slug} - s'Quizz Game`);
        setUserQuizz(userQuizzData);
      };
    };
  }, []);

  const displayedQuizz = useMemo(() => {
    if(filter) {
      return userQuizzData.filter((quiz: Quiz) => {
        return quiz.title.toLowerCase().includes(filter.toLowerCase()) ||
        quiz.creator.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return userQuizzData;

  }, [filter, userQuizz]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Page de {router.query.slug}
        </h1>

        <PlayedQuizz
          playedData={playedData}
        />
      </header>

      <section className={styles.container}>

        {userQuizz?.length > 10 &&
          <div className={styles.input}>
            <InputField
              name={'Chercher un quiz...'}
              state={filter}
              inputID={'quizz-filter'}
              type={'search'}
              isDisabled={false}
              required={true}
              autoFocus={true}
              setState={setFilter}
            />
          </div>
        }

        <ul className={styles.list}>

          {displayedQuizz?.map((quiz: Quiz, index: number) =>
            <li key={index}>
              <ProfileQuizCard
                quiz={quiz}
              />
            </li>
          )}
        </ul>
      </section>

      {isLogged && userLogged.pseudo !== userData.pseudo &&
        <>
          {report ?
            <Report
              user_id={userLogged.id}
              pseudo={userLogged.pseudo}
              about={'user'}
              about_id={userData.id}
              about_title={userData.pseudo}
              setShowReportForm={setReport}
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

  const playedDataFromAPI = await fetch(`${api}/played/getAllFromUser`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: userData.id })
  });
  const playedData = await playedDataFromAPI.json();

  return {
    props: {
      userData,
      userQuizzData,
      playedData
    }
  };
};