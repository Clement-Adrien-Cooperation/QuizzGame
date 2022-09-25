import { Quiz } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../../../api/api';
import Image from 'next/image';
import styles from './ReportedSubject.module.scss';
import mail from '../../../../public/icons/mail.svg';
import eye from '../../../../public/icons/eye_visible.svg';
import trash from '../../../../public/icons/delete.svg';
import restore from '../../../../public/icons/restore.svg';

type Props = {
  quiz: Quiz
};

const ReportedQuiz: FunctionComponent<Props> = ({
  quiz
}) => {

  const router = useRouter();

  const [visible, setVisible] = useState<boolean>(quiz.is_visible);

  const moderateQuiz = async() => {
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
  };

  return (
    <>
      <section className={styles.details}>
        <p>
          Créé par 
          <span
            className={styles.creator}
            onClick={() => router.push('/admin/users')}
          >
            {quiz.creator}
          </span>
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
          Visible par les utilisateurs : {quiz.is_visible ? "✅" : "🚫"}
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
        
      </footer>
    </>
  );
};

export default ReportedQuiz;