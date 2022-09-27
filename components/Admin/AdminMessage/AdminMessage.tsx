import type { ChangeEvent, Dispatch, FormEvent, FunctionComponent, SetStateAction } from 'react';
import { useState } from 'react';
import { api } from '../../../api/api';
import InputField from '../../InputField/InputField';
import Loader from '../../Loader/Loader';
import Modal from '../../Modal/Modal';
import TextArea from '../../TextArea/TextArea';
import Warning from '../../Warning/Warning';
import styles from './AdminMessage.module.scss';

type Props = {
  recipient: string,
  userID: string
  setNotification: Dispatch<SetStateAction<string>>,
  setShowMessageForm: Dispatch<SetStateAction<boolean>>
};

const AdminMessage: FunctionComponent<Props> = ({
  recipient,
  userID,
  setNotification,
  setShowMessageForm
}) => {
  
  const [title, setTitle] = useState<string>('Message de la modération');
  const [message, setMessage] = useState<string>('');

  const [warningMessage, setWarningMessage] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    if(title.length > 50) {
      setWarningMessage("Le titre ne doit pas excéder 50 caractères");
    } else {
      setWarningMessage('');
    };

    setTitle(event.target.value);
  };

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if(message.length > 1000) {
      setWarningMessage("Le message ne doit pas excéder 1000 caractères");
    } else {
      setWarningMessage('');
    };

    setMessage(event.target.value);
  };

  const checkForm = () => {
    // If message is too long
    if(message.length > 1000) {
      // Warn admin
      setWarningMessage('Le message ne doit pas excéder 1000 caractères');
      return false;

    } else if(title.length > 50) {
      setWarningMessage('Le titre ne doit pas excéder 50 caractères');
      return false;

    } else {
      // If it's good, return true
      return true;
    };
  };

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // check form
    if(checkForm()) {
      // If we want to send the message to all users
      if(recipient === "tous les utilisateurs") {
        // call right function
        sendToAllUsers();
      } else {
        // or if we want to send it to only one user
        sendToOneUser();
      };
    };
  };

  const sendToOneUser = async() => {
    setShowLoader(true);

    // Get token from local storage
    const token = localStorage.getItem('token');

    const body = {
      user_id: userID,
      title,
      message,
      date: new Date().toLocaleDateString()
    };

    // Create message for the right user
    await fetch(`${api}/notification/createOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 201) {
        setNotification('Message envoyé ✅');
        setShowMessageForm(false);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  const sendToAllUsers = async() => {
    setShowLoader(true);

    // Get token from local storage
    const token = localStorage.getItem('token');

    const body = {
      title,
      message,
      date: new Date().toLocaleDateString()
    };

    // Create message for all users
    await fetch(`${api}/notification/createMany`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 201) {
        setNotification('Message envoyé ✅');
        setShowMessageForm(false);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };

  return (
    <Modal
      setShowModal={setShowMessageForm}
    >
      <section className={styles.container}>

        <header className={styles.header}>
          <h5 className={styles.title}>
            Envoyer un message à {recipient}
          </h5>
        </header>

        {warningMessage &&
          <Warning
            warningMessage={warningMessage}
            setWarningMessage={setWarningMessage}
          />
        }

        <form
          className={styles.form}
          onSubmit={handleSubmitForm}
        >
          <InputField
            name={"Titre"}
            state={title}
            inputID={"admin-title"}
            type={"text"}
            isDisabled={false}
            required={true}
            autoFocus={true}
            handleFunction={handleChangeTitle}
          />

          <TextArea
            inputID={'admin-message'}
            label={'Message'}
            state={message}
            handleFunction={handleChangeMessage}
            title={`Écrivez un message à ${recipient}`}
            required={true}
          />

          <button
            className={styles.submit}
            type="submit"
            title={`Envoyer ce message à ${recipient}`}
            aria-label={`Envoyer ce message à ${recipient}`}
          >
            Envoyer
          </button>
        </form>
      </section>

      {showLoader &&
        <Loader />
      }
    </Modal>
  );
};

export default AdminMessage;