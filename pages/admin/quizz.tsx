import type { Dispatch, SetStateAction } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import type { Quiz, User } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import AdminQuizz from '../../components/Admin/AdminQuizz/AdminQuizz';
import AdminDeletedQuizz from '../../components/Admin/AdminDeletedQuizz/AdminDeletedQuizz';
import styles from '../../styles/admin/AdminQuizz.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setPageTitle: Dispatch<SetStateAction<string>>,
  quizzData: Quiz[]
};

const Quizz: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader,
  setPageTitle,
  quizzData
}) => {

  const router = useRouter();

  const [quizz, setQuizz] = useState<Quiz[]>([]);
  const [deletedQuizz, setDeletedQuizz] = useState<Quiz[]>([]);

  useEffect(() => {
    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        setShowLoader(true);

        setPageTitle("Modérer les utilisateurs - s'Quizz Game");

        setQuizz(quizzData);
        getDeletedQuizz();

      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getDeletedQuizz = async () => {

    const token = localStorage.getItem('token');

    await fetch(`${api}/quiz/getDeletedQuizz`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();
      setDeletedQuizz(data);
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const handleModerateQuiz = async(quiz_id: string, is_visible: boolean, index: number) => {

    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/quiz/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ quiz_id, is_visible })
    })
    .then(() => {
      if(is_visible) {
        // update state of this quiz, & switch it from quizz to deletedQuizz
        const newDeletedQuiz = quizz[index];
        newDeletedQuiz.is_visible = false;
        setDeletedQuizz([...deletedQuizz, newDeletedQuiz]);

        // delete right quiz from state & update it for visible quizz as well
        const previousQuizz = [...quizz];
        previousQuizz.splice(index, 1);
        setQuizz([...previousQuizz]);
      } else {
        // Same, but reverse
        const newVisibleQuiz = deletedQuizz[index];
        newVisibleQuiz.is_visible = true;
        setQuizz([...quizz, newVisibleQuiz]);

        const previousDeletedQuizz = [...deletedQuizz];
        previousDeletedQuizz.splice(index, 1);
        setDeletedQuizz([...previousDeletedQuizz]);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const handleDeleteQuiz = async(quiz_id: string, index: number) => {

    setShowLoader(true);
    const token = localStorage.getItem('token');

    await fetch(`${api}/quiz/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify({ quiz_id })
    })
    .then(() => {
      // splice right quiz from state & update it
      const previousDeletedQuizz = [...deletedQuizz];
      previousDeletedQuizz.splice(index, 1);
      setDeletedQuizz([...previousDeletedQuizz]);
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <section className={styles.wrapper}>
      <AdminHeader />

      <aside className={styles.buttons}>
        {quizz?.length > 10 &&
          <a
            className={styles.buttons__item}
            href='#quizz'
            title="Aller aux quizz visibles"
            aria-label="Aller aux quizz visibles"
          >
            Quizz
          </a>
        }

        {deletedQuizz?.length !== 0 &&
          <a
            className={styles.buttons__item}
            href='#deleted-quizz'
            title="Aller aux quizz modérés"
            aria-label="Aller aux quizz modérés"
          >
            Quizz modérés
          </a>
        }
      </aside>

      <div className={styles.container}>

        {quizz?.length !== 0 &&
          <section
            className={styles.quizz}
            id='quizz'
          >
            <AdminQuizz
              quizz={quizz}
              handleModerateQuiz={handleModerateQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
            />
          </section>
        }

        {deletedQuizz?.length !== 0 &&
          <section
            className={styles.quizz}
            id='deleted-quizz'
          >
            <AdminDeletedQuizz
              deletedQuizz={deletedQuizz}
              handleModerateQuiz={handleModerateQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
            />
          </section>
        }
      </div>
    </section>
  );
};

export default Quizz;

export const getServerSideProps: GetServerSideProps = async () => {

  const quizzDataFromAPI = await fetch(`${api}/quiz/getAll`);
  const quizzData = await quizzDataFromAPI.json();

  return {
    props: {
      quizzData
    }
  };
};