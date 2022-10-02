import type { FunctionComponent } from 'react'
import type { Comment, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react'
import styles from './QuizComments.module.scss';
import CommentCard from '../CommentCard/CommentCard';
import CommentForm from '../CommentForm/CommentForm';
import Message from '../../Message/Message';

type Props = {
  commentsData: Comment[]
  quiz_id: string,
  userLogged: User,
  isLogged: boolean
};

const QuizComments: FunctionComponent<Props> = ({
  commentsData,
  quiz_id,
  userLogged,
  isLogged
}) => {

  const [comments, setComments] = useState<Comment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');

  useEffect(() => {
    setComments(commentsData);
  }, []);

  return (
    <>
      <section className={styles.comments}>

        <header className={styles.header}>
          <h2>
            {comments.length} {comments.length > 1 ? "commentaires" : "commentaire"}
          </h2>

          {isLogged &&
            <button
              className={styles.button}
              type="button"
              title="Écrire un commentaire à propos de ce quiz"
              aria-label="Écrire un commentaire à propos de ce quiz"
              onClick={() => setShowCommentForm(true)}
            >
              Commenter
            </button>
          }
        </header>

        <ul className={styles.list}>
          {comments?.map((comment, index) =>

            <li key={uuidv4()}>
              <CommentCard
                comment={comment}
                comments={comments}
                setComments={setComments}
                index={index}
                userLogged={userLogged}
              />
            </li>
          )}
        </ul>
      </section>

      {showCommentForm &&
        <CommentForm
          userLogged={userLogged}
          quiz_id={quiz_id}
          comments={comments}
          setComments={setComments}
          setShowCommentForm={setShowCommentForm}
          setNotification={setNotification}
        />
      }

      {notification &&
        <Message
          message={notification}
          setMessage={setNotification}
        />
      }
    </>
  );
};

export default QuizComments;