import type { Dispatch, FunctionComponent, SetStateAction } from 'react';
import type { Quiz, User } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import styles from './UserQuizCard.module.scss';

import ConfirmModal from '../ConfirmModal/ConfirmModal';
import IconButton from '../IconButton/IconButton';
import IconTrash from '../../public/Icons/IconTrash';
import IconPen from '../../public/Icons/IconPen';
import IconPlay from '../../public/Icons/IconPlay';
import Message from '../Message/Message';

type Props = {
  quiz: Quiz,
  quizz: Quiz[],
  setQuizz: Dispatch<SetStateAction<Quiz[]>>,
  index: number,
  userLogged: User,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const UserQuizCard: FunctionComponent<Props> = ({
  quiz,
  quizz,
  setQuizz,
  index,
  userLogged,
  setShowLoader,
}) => {

  const router = useRouter();

  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleDeleteQuiz = async () => {
    setShowLoader(true);

    const token = localStorage.getItem('token');

    const body = {
      user_id: userLogged.id,
      quiz_id: quiz.id
    };

    await fetch(`${api}/quiz/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        const newQuizz = [...quizz];
        newQuizz.splice(index, 1);
        setQuizz(newQuizz);
      } else {
        setMessage('❌ Une erreur est survenue');
      };
    })
    .catch((error) => {
      console.log(error);
      setMessage('❌ Une erreur est survenue');
    });

    setShowLoader(false);
  };

  return (
    <>
      <article className={styles.card}>
        <header className={styles.header}>
          <h3
            className={styles.title}
            title={`${quiz.title}`}
            aria-label={`${quiz.title}`}
          >
            {quiz.title}
          </h3>

          <span className={styles.category}>
            {quiz.category}
          </span>
        </header>

        <section className={styles.buttons}>
          <IconButton
            title={
              quiz.nbOfQuestions < 10 ?
                "Ce quiz n'est pas jouable car il contient moins de 10 questions" 
              :
                "Jouer à ce quiz"
            }
            handleFunction={
              quiz.nbOfQuestions < 10 ?
                () => {}
              :
                () => router.push(`/quizz/${quiz.title}`)
            }
          >
            <IconPlay />
          </IconButton>

          <IconButton
            title='Modifier ce quiz'
            handleFunction={() => router.push(`/quizz/update/${quiz.title}`)}
          >
            <IconPen />
          </IconButton>

          <IconButton
            title='Supprimer ce quiz'
            handleFunction={() => setShowConfirmModal(true)}
          >
            <IconTrash />
          </IconButton>
        </section>

        <footer className={styles.footer}>

          {!quiz.is_visible &&
            <span
              className={styles.warning}
              title="Ce quiz a été supprimé par la modération. Contactez-nous quand le quiz sera corrigé"
              aria-label="Ce quiz a été supprimé par la modération. Contactez-nous quand le quiz sera corrigé"
            >
              🚫
            </span>
          }

          {quiz.nbOfQuestions < 10 &&
            <span
              className={styles.warning}
              title="Ce quiz n'est pas jouable car il contient moins de 10 questions"
              aria-label="Ce quiz n'est pas jouable car il contient moins de 10 questions"
            >
              ⚠️
            </span>
          }
        </footer>
      </article>

      {showConfirmModal &&
        <ConfirmModal
          message={`Êtes vous certain de vouloir supprimer le quiz "${quiz.title}" ?`}
          text={"Toutes les questions qu'il contient seront supprimées"}
          handleFunction={handleDeleteQuiz}
          closeModal={() => setShowConfirmModal(false)}
        />
      }

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }
    </>
  );
};

export default UserQuizCard;