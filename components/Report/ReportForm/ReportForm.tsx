import type { ChangeEvent, FunctionComponent } from 'react';
import { useState } from 'react';
import { api } from '../../../api/api';
import Loader from '../../Loader/Loader';
import TextArea from '../../TextArea/TextArea';
import Warning from '../../Warning/Warning';
import styles from './ReportForm.module.scss';

type Props = {
  user_id: string,
  pseudo: string,
  about: string,
  about_id: string,
  about_title: string
};

const ReportForm: FunctionComponent<Props> = ({
  user_id,
  pseudo,
  about,
  about_id,
  about_title,
}) => {

  const [message, setMessage] = useState<string>('');

  const [reported, setReported] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>('');
  const [showLoader, setShowLoader] = useState<boolean>(false);

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {

    if(message.length > 1000) {
      setWarningMessage('Votre signalement ne doit pas excéder 1000 caractères');
    } else {
      setWarningMessage('');
    };

    setMessage(event.target.value);
  };

  const handleSubmitForm = async() => {
    setShowLoader(true);

    // Get token from local storage
    const token = localStorage.getItem('token');

    // set up the body
    const body = {
      user_id,
      pseudo,
      about,
      about_id,
      about_title,
      message,
      date: new Date().toLocaleDateString()
    };

    // Create new report in API
    await fetch(`${api}/report/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status !== 201) {
        setWarningMessage('Un problème est survenu, veuillez réessayer ou nous contacter');
      } else {
        setReported(true);
        setShowLoader(false);
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <>
      {reported ?
        <p className={styles.text}>
          Merci pour votre signalement
        </p>
      :
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
            inputID={"report-message"}
            label={"Détails du signalement"}
            state={message}
            handleFunction={handleChangeMessage}
            title={"Écrivez à la modération et donnez des détails à propos de ce qui vous semble faux ou choquant"}
            required={true}
          />

          <button
            className={styles.submit}
            type="submit"
            title="Envoyer ce signalement"
            aria-label="Envoyer ce signalement"
          >
            Envoyer
          </button>
        </form>
      }

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportForm;