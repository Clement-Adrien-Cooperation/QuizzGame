import type { ChangeEvent, Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react'
import type { Comment, User } from '@prisma/client';
import { useState } from 'react';
import { api } from '../../../api/api';
import styles from './CommentForm.module.scss';
import TextArea from '../../TextArea/TextArea';
import Loader from '../../Loader/Loader';
import Warning from '../../Warning/Warning';
import Modal from '../../Modal/Modal';

type Props = {
  userLogged: User,
  quiz_id: string,
  comments: Comment[],
  setComments: Dispatch<SetStateAction<Comment[]>>,
  setShowCommentForm: Dispatch<SetStateAction<boolean>>,
  setNotification: Dispatch<SetStateAction<string>>
};

const CommentForm: FunctionComponent<Props> = ({
  userLogged,
  quiz_id,
  comments,
  setComments,
  setShowCommentForm,
  setNotification
}) => {

  const [comment, setComment] = useState<string>('');

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
      quiz_id,
      author: userLogged.pseudo,
      content: comment,
      date: new Date().toLocaleDateString(),
      likes: 0,
      likes_IDs: []
    };

    // create comment in database
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
        // set notification
        setNotification('Commentaire envoyé ✅');

        // await data from api
        const newComment = await res.json();

        // create new list of comments with our new comment
        const newList = [newComment, ...comments];

        // update state
        setComments(newList);

        // hide form
        setShowCommentForm(false);
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
    <Modal
      setShowModal={setShowCommentForm}
    >
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <header className={styles.header}>
          <h4>
            Ajouter un commentaire
          </h4>
        </header>

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

      {showLoader &&
        <Loader />
      }
    </Modal>
  );
};

export default CommentForm;