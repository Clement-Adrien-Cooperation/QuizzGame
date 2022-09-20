import { FunctionComponent, Dispatch, SetStateAction, useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import Notification from '../Notification/Notification';
import ReportForm from './ReportForm/ReportForm';
import Warning from '../Warning/Warning';
import styles from './Report.module.scss';

type Props = {
  pseudo: string,
  about: string,
  about_id: string,
  setShowReportForm: Dispatch<SetStateAction<boolean>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Report: FunctionComponent<Props> = ({
  pseudo,
  about,
  about_id,
  setShowReportForm,
  setShowLoader
}) => {

  const [reported, setReported] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>('');
  const [warningMessage, setWarningMessage] = useState<string>('');

  const closeModal = () => {
    setShowReportForm(false);
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.behind}
        onClick={closeModal}
      ></div>

      <section className={styles.modal}>
        <header className={styles.header}>
          <h4 className={styles.title}>
            Signalement
          </h4>

          <CloseButton
            handleFunction={closeModal}
          />
        </header>

        {reported ?
          <>
            {warningMessage ?
              <Warning
                warningMessage={warningMessage}
                setWarningMessage={setWarningMessage}
              />
            :
              <Notification
                notification={notification}
                setNotification={setNotification}
              />
            }
          </>
        :
          <ReportForm
            pseudo={pseudo}
            about={about}
            about_id={about_id}
            setShowLoader={setShowLoader}
            setReported={setReported}
            setWarningMessage={setWarningMessage}
            setNotification={setNotification}
          />
        }

      </section>
    </div>
  );
};

export default Report;