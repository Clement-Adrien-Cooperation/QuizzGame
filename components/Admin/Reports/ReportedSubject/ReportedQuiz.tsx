import type { FunctionComponent } from 'react';
import type { Quiz } from '@prisma/client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../../../api/api';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ReportedSubject.module.scss';
import mail from '../../../../public/icons/mail.svg';
import eye from '../../../../public/icons/eye_visible.svg';
import trash from '../../../../public/icons/delete.svg';
import restore from '../../../../public/icons/restore.svg';
import ban from '../../../../public/icons/ban.svg';
import unban from '../../../../public/icons/unban.svg';
import Loader from '../../../Loader/Loader';

type Props = {
  quiz: Quiz,
};

const ReportedQuiz: FunctionComponent<Props> = ({
  quiz
}) => {

  const router = useRouter();

  const [visible, setVisible] = useState<boolean>(quiz.is_visible);
  const [banned, setBanned] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    getCreator();
  }, []);

  const getCreator = async() => {
    setShowLoader(true);

    // get token for authorization
    const token = localStorage.getItem('token');

    await fetch(`${api}/user/getOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ user_id: quiz.user_id })
    })
    .then(async(res) => {
      if(res.status === 200) {
        const user = await res.json();
        // if user is found, update banishment state
        setBanned(user.is_banished);
      } else {
        console.log("Cet utilisateur n'existe plus");
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const moderateQuiz = async() => {
    setShowLoader(true);

    // We need token to proove that we are admin
    const token = localStorage.getItem('token');

    // set body
    const body = {
      quiz_id: quiz.id,
      is_visible: visible
    };

    // delete (hide) or restore the quiz
    await fetch(`${api}/quiz/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        // toggle state
        setVisible(!visible);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const moderateCreator = async() => {
    setShowLoader(true);

    // get token for authorization
    const token = localStorage.getItem('token');

    // set body
    const body = {
      user_id: quiz.user_id,
      is_banished: banned
    };

    await fetch(`${api}/user/moderate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        setBanned(!banned);
      };
    })
    .catch((error) => {
      console.log(error); 
    });

    setShowLoader(false);
  };

  return (
    <>
      <section className={styles.details}>
        <p>
          Créé par 
          <Link href={`/profile/${quiz.creator}`}>
            <a
              className={styles.creator}
              title={`Voir le profil de ${quiz.creator}`}
              aria-label={`Voir le profil de ${quiz.creator}`}
            >
              {quiz.creator}
            </a>
          </Link>
        </p>

        <p>
          Le {quiz.date}
        </p>

        <p>
          Catégorie : {quiz.category}
        </p>

        <p>
          Difficulté : {quiz.difficulty}
        </p>

        <p>
          Nombre de questions : {quiz.nbOfQuestions}
        </p>

        <p>
          Visible par les utilisateurs : {visible ? "✅" : "🚫"}
        </p>
      </section>

      <footer className={styles.footer}>
        <button
          className={styles.button}
          type="button"
          title="Voir les questions de ce quiz"
          aria-label="Voir les questions de ce quiz"
          onClick={() => router.push('/admin/quizz')}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Un oeil'
            src={eye}
          />
        </button>

        <button
          className={styles.button}
          type="button"
          title="Envoyer un message au créateur du quiz"
          aria-label="Envoyer un message au créateur du quiz"
          onClick={() => console.log('créer lenvoi de message')}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une enveloppe'
            src={mail}
          />
        </button>

        <button
          className={styles.button}
          type="button"
          title={visible ? "Supprimer temporairement ce quiz" : "Restaurer ce quiz dans s'Quizz Game"}
          aria-label={visible ? "Supprimer temporairement ce quiz" : "Restaurer ce quiz dans s'Quizz Game"}
          onClick={moderateQuiz}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une poubelle'
            src={visible ? trash : restore}
          />
        </button>

        <button
          className={styles.button}
          type="button"
          title={banned ? "Débannir le créateur de ce quiz" : "Bannir le créateur de ce quiz"}
          aria-label={banned ? "Débannir le créateur de ce quiz" : "Bannir le créateur de ce quiz"}
          onClick={moderateCreator}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt={banned ? "Une flèche entrant dans une porte" : "Une flèche sortant d'une porte"}
            src={banned ? unban : ban}
          />
        </button>
      </footer>

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportedQuiz;