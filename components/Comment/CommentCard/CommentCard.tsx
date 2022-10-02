import type { FunctionComponent, Dispatch, SetStateAction } from 'react'
import type { Comment, User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../api/api';
import styles from './CommentCard.module.scss';
import Loader from '../../Loader/Loader';
import Message from '../../Message/Message';
import Link from 'next/link';
import Report from '../../Report/Report';

type Props = {
  comment: Comment,
  comments: Comment[],
  setComments: Dispatch<SetStateAction<Comment[]>>,
  index: number,
  userLogged: User
};

const CommentCard: FunctionComponent<Props> = ({
  comment,
  comments,
  setComments,
  index,
  userLogged
}) => {

  const [notification, setNotification] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [showReportForm, setShowReportForm] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(comment.likes);
  const [liked, setLiked] = useState<boolean>(comment.likes_IDs.includes(userLogged.id));
 
  const handleDeleteComment = async() => {
    setShowLoader(true);

    // Get token from local storage for authorization
    const token = localStorage.getItem('token');

    // Delete comment
    await fetch(`${api}/comment/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ id: comment.id })
    })
    .then((res) => {
      if(res.status === 200) {
        setNotification("Commentaire supprimé ✅");
        updateCommentsState();
      } else {
        setNotification("Un problème est survenu, veuillez réessayer ou nous contacter");
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const updateCommentsState = () => {
    // Get previous state
    const previousComments = [...comments];

    // Delete right comment from list
    previousComments.splice(index, 1);

    // Update state
    setComments(previousComments);
  };

  const handleLikeComment = async() => {
    const token = localStorage.getItem('token');

    const newIDs = [...comment.likes_IDs, userLogged.id];

    const body = {
      id: comment.id,
      user_id: userLogged.id,
      likes_IDs: newIDs
    };

    await fetch(`${api}/comment/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 200) {
        setLiked(true);
        setLikes(likes => likes + 1);
      } else {
        setNotification("Un problème est survenu, veuillez réessayer ou nous contacter");
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      <article className={styles.card}>
        <header className={styles.header}>
          <h3 className={styles.author}>
            <Link href={`/profile/${comment.author}`}>
              <a
                className={styles.link}
                title={`Voir le profil de ${comment.author}`}
                aria-label={`Voir le profil de ${comment.author}`}
              >
                {comment.author}
              </a>
            </Link>
          </h3>

          <span className={styles.date}>
            le {comment.date}
          </span>
        </header>

        <p className={styles.text}>
          {comment.content}
        </p>

        <footer className={styles.footer}>
          {!liked && comment.user_id !== userLogged.id &&
            <button
              className={styles.button}
              type="button"
              title="Aimer ce commentaire"
              aria-label="Aimer ce commentaire"
              onClick={handleLikeComment}
            >
              J'aime
            </button>
          }

          {likes > 0 &&
            <span className={styles.likes}>
              {likes} 👍
            </span>
          }


          <button
            className={styles.button}
            type="button"
            title={userLogged.id === comment.user_id ? "Supprimer ce commentaire" : "Signaler ce commentaire"}
            aria-label={userLogged.id === comment.user_id ? "Supprimer ce commentaire" : "Signaler ce commentaire"}
            onClick={
              userLogged.id === comment.user_id ?
                handleDeleteComment
              :
                () => setShowReportForm(true)
            }
          >
            {userLogged.id === comment.user_id ? "Supprimer" : "Signaler"}
          </button>
        </footer>
      </article>

      {notification &&
        <Message
          message={notification}
          setMessage={setNotification}
        />
      }

      {showReportForm &&
        <Report
          user_id={userLogged.id}
          pseudo={userLogged.pseudo}
          about={'comment'}
          about_id={comment.id}
          about_title={`Commentaire de ${comment.author}`}
          setShowReportForm={setShowReportForm}
        />
      }

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default CommentCard;