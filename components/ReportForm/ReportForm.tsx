import { ChangeEvent, FunctionComponent, useState, Dispatch, SetStateAction } from 'react';
import { api } from '../../api/api';
import TextArea from '../TextArea/TextArea';
import styles from './ReportForm.module.scss';

type Props = {
  pseudo: string,
  about: string,
  about_id: string,
  setShowLoader: Dispatch<SetStateAction<boolean>>,
  setReported: Dispatch<SetStateAction<boolean>>,
  setWarningMessage: Dispatch<SetStateAction<string>>,
  setNotification: Dispatch<SetStateAction<string>>
};

const ReportForm: FunctionComponent<Props> = ({
  pseudo,
  about,
  about_id,
  setShowLoader,
  setReported,
  setWarningMessage,
  setNotification
}) => {

  const [message, setMessage] = useState<string>('');

  const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmitForm = async() => {
    setShowLoader(true);

    await createReport();

    setShowLoader(false);
    setReported(true);
  };

  const createReport = async() => {

    const token = localStorage.getItem('token');

    const body = {
      pseudo,
      about,
      about_id,
      message,
      date: new Date().toLocaleDateString()
    };

    await fetch(`${api}/report/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then((res) => {
      if(res.status === 201) {
        setNotification('Merci pour votre signalement');
      } else {
        setWarningMessage('Un problème est survenu. Veuillez réessayez ou nous contacter');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmitForm}
    >
      <TextArea
        inputID={"report-message"}
        label={"Détails du signalement"}
        state={message}
        handleFunction={handleChangeMessage}
        title={"Écrivez à la modération et donnez des détails à propos de ce qui vous semble faux ou choquant"}
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
  );
};

export default ReportForm;