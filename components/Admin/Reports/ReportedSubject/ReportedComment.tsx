import type { FunctionComponent } from 'react';
import type { Comment } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../../api/api';
import styles from './ReportedSubject.module.scss';

import Link from 'next/link';
import Loader from '../../../Loader/Loader';
import Modal from '../../../Modal/Modal';
import AdminMessage from '../../AdminMessage/AdminMessage';
import Message from '../../../Message/Message';

import IconButton from '../../../IconButton/IconButton';
import IconTrash from '../../../Icons/IconTrash';
import IconMail from '../../../Icons/IconMail';

type Props = {
  comment: Comment,
  getReports: () => void
};

const ReportedComment: FunctionComponent<Props> = ({
  comment,
  getReports
}) => {
  
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

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

        <div className={styles.message}>
          Message :

          <p className={styles.message__content}>
            {comment.content}
          </p>
        </div>

        <p className={styles.likes}>
          {comment.likes} ❤️️
        </p>
      </section>

      <footer className={styles.footer}>
        <IconButton
          title="Envoyer un message au créateur du commentaire"
          handleFunction={() => setShowMessage(true)}
        >
          <IconMail />
        </IconButton>

        <IconButton
          title="Supprimer ce commentaire"
          handleFunction={deleteComment}
        >
          <IconTrash />
        </IconButton>
      </footer>

      {showMessage &&
        <Modal
          setShowModal={setShowMessage}
        >
          <AdminMessage
            recipient={comment.author}
            userID={comment.user_id}
            setNotification={setMessage}
            setShowMessageForm={setShowMessage}
          />
        </Modal>
      }

      {message &&
        <Message
          message={message}
          setMessage={setMessage}
        />
      }

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportedComment;