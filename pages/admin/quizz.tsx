import { Quiz, User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import AdminQuizz from '../../components/AdminQuizz/AdminQuizz';
import AdminDeletedQuizz from '../../components/AdminDeletedQuizz/AdminDeletedQuizz';
import styles from '../../styles/admin/AdminQuizz.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Quizz: NextPage<Props> = ({
  isLogged,
  userLogged,
  setShowLoader
}) => {

  const router = useRouter();

  const [quizz, setQuizz] = useState<Quiz[]>([]);
  const [deletedQuizz, setDeletedQuizz] = useState<Quiz[]>([]);
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        document.title = "Modérer les utilisateurs - s'Quizz Game";
        getQuizz();

      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getQuizz = async () => {

    const token = localStorage.getItem('token');

    await fetch('/api/quiz/getAll', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      const data = await res.json();
      setQuizz(data);
    })
    .catch((error) => {
      console.log(error);
    });

    await fetch('/api/quiz/getDeletedQuizz', {
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

  const handleModerateQuiz = async(id: string, is_visible: boolean) => {

    setShowLoader(true);

    await fetch('/api/quiz/moderate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_visible })
    })
    .then(() => {
      getQuizz();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleDeleteQuiz = async(id: string) => {

    setShowLoader(true);

    await fetch('/api/quiz/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    .then(() => {
      getQuizz();
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <section className={styles.wrapper}>
      <AdminHeader />

      <aside className={styles.buttons}>
        {quizz.length < 10 ? '' : (
          <a
            className={styles.buttons__item}
            href='#quizz'
          >
            Aller aux quizz
          </a>
        )}

        {deletedQuizz.length === 0 
        || quizz.length < 10 ? '' : (
          <a
            className={styles.buttons__item}
            href='#deleted-quizz'
          >
            Aller aux quizz supprimés
          </a>
        )}
      </aside>

      <div className={styles.container}>

        {quizz.length === 0 ? '' :
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

        {deletedQuizz.length === 0 ? '' : (

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
        )} 
      </div>
    </section>
  );
};

export default Quizz;