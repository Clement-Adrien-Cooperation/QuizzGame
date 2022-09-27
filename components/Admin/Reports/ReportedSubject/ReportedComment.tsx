import type { FunctionComponent } from 'react';
import type { Comment } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../../api/api';
import styles from './ReportedSubject.module.scss';
import Image from 'next/image';
import mail from '../../../../public/icons/mail.svg';
import trash from '../../../../public/icons/delete.svg';
import Link from 'next/link';
import Loader from '../../../Loader/Loader';

type Props = {
  comment: Comment,
  getReports: () => void
};

const ReportedComment: FunctionComponent<Props> = ({
  comment,
  getReports
}) => {
  
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const deleteComment = async() => {
    setShowLoader(true);

    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // Delete the right comment in database
    await fetch(`${api}/comment/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ id: comment.id})
    })
    .then((res) => {
      if(res.status === 200) {
        getReports();
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
          Écrit par 
          <Link href={`/profile/${comment.author}`}>
            <a
              className={styles.creator}
              title={`Voir le profil de ${comment.author}`}
              aria-label={`Voir le profil de ${comment.author}`}
            >
              {comment.author}
            </a>
          </Link>
        </p>

        <p>
          <span className={styles.message}>
            Message :
          </span>
          {comment.content}
        </p>

        <p>
          {comment.likes} ❤️️
        </p>
      </section>

      <footer>
        {/* <button
          className={styles.button}
          type="button"
          title="Envoyer un message au créateur du commentaire"
          aria-label="Envoyer un message au créateur du commentaire"
          onClick={() => console.log('créer lenvoi de message')}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une enveloppe'
            src={mail}
          />
        </button> */}
        
        <button
          className={styles.button}
          type="button"
          title="Envoyer un message au créateur du commentaire"
          aria-label="Envoyer un message au créateur du commentaire"
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
          title="Supprimer ce commentaire"
          aria-label="Supprimer ce commentaire"
          onClick={deleteComment}
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt='Une poubelle'
            src={trash}
          />
        </button>
      </footer>

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportedComment;