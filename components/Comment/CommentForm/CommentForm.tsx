import type { ChangeEvent, Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react'
import type { User } from '@prisma/client';
import { useState } from 'react';
import styles from './CommentForm.module.scss';
import TextArea from '../../TextArea/TextArea';
import Loader from '../../Loader/Loader';
import { api } from '../../../api/api';
import Warning from '../../Warning/Warning';
import Message from '../../Message/Message';

type Props = {
  userLogged: User,
  quizID: string,
  comments: Comment[],
  setComments: Dispatch<SetStateAction<Comment[]>>
};

const CommentForm: FunctionComponent<Props> = ({
  userLogged,
  quizID,
  comments,
  setComments
}) => {

  const [comment, setComment] = useState<string>('');

  const [notification, setNotification] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if(comment.length > 300) {
      setDisableButton(true);
      setWarningMessage("Votre commentaire ne doit pas excéder 300 caractères");
    } else {
      setDisableButton(false);
      setWarningMessage('');
    };

    setComment(event.target.value);
  };

  const handleSubmitForm = async(event: FormEvent<HTMLFormElement>) => {
    // Prevent refresh
    event.preventDefault();

    // Loader on
    setShowLoader(true);

    // Get token for authorization from local storage
    const token = localStorage.getItem('token');

    // Set the body with required elements for creating comment
    const body = {
      user_id: userLogged.id,
      quiz_id: quizID,
      author: userLogged.pseudo,
      content: comment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      likes_IDs: []
    };

    await fetch(`${api}/comment/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status === 201) {
        setNotification("Commentaire envoyé ✅");

        const newComment = await res.json();

        const newList = [...comments, newComment];

        setComments(newList);


        // ! Est-ce que cette action re-rend le composant, et donc efface la notification ou autre ??

      } else {
        setWarningMessage("Un problème est survenu. Veuillez réessayer ou nous contacter si le problème persiste.");
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        {warningMessage &&
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        }

        <TextArea
          inputID={"comment-content"}
          label={"Commentaire"}
          state={comment}
          title={"Écrivez un commentaire à propos de ce quiz"}
          required={true}
          handleFunction={handleChangeComment}
        />

        <button
          className={styles.submit}
          type="submit"
          title="Envoyer ce commentaire"
          aria-label="Envoyer ce commentaire"
          disabled={disableButton}
        >
          Envoyer
        </button>
      </form>

      {notification &&
        <Message
          message={notification}
          setMessage={setNotification}
        />
      }

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default CommentForm;