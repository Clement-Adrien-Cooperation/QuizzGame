import { Report } from '@prisma/client';
import { FunctionComponent, useState } from 'react';
import { api } from '../../../../api/api';
import styles from './ReportsCard.module.scss';
import eye from '../../../../public/icons/eye_visible.svg';
import trash from '../../../../public/icons/delete.svg';
import mail from '../../../../public/icons/mail.svg';
import Image from 'next/image';
import ReportedSubject from '../ReportedSubject/ReportedSubject';
import Link from 'next/link';
import Modal from '../../../Modal/Modal';
import AdminMessage from '../../AdminMessage/AdminMessage';
import Message from '../../../Message/Message';

type Props = {
  report: Report,
  getReports: () => void,
  reportsSorting: (reports: Report[]) => void
};

const ReportsCard: FunctionComponent<Props> = ({
  report,
  getReports,
  reportsSorting
}) => {

  const [showSubject, setShowSubject] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const deleteReport = async() => {

    // Get token from local storage
    const token = localStorage.getItem('token');

    // delete report from API with the right ID
    await fetch(`${api}/report/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify({ id: report.id })
    })
    .then(async(res) => {
      if(res.status === 200) {
        const newReports = await res.json();
        // update state by sorting data received
        reportsSorting(newReports);
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
          <h4>
            {report.about_title}
          </h4>
        </header>

        <section className={styles.details}>

          <p className={styles.message}>
            {report.message}
          </p>

          <div className={styles.container}>
            <p>
              Signalé par
              <Link href={`/profile/${report.pseudo}`}>
                <a
                  className={styles.link}
                  title={`Voir le profil de ${report.pseudo}`}
                  aria-label={`Voir le profil de ${report.pseudo}`}
                >
                  {report.pseudo}
                </a>
              </Link>
            </p>

            <span>
              le {report.date}
            </span>
          </div>
        </section>

        <footer className={styles.footer}>
          <button
            className={styles.button}
            type="button"
            title="Voir les détails du sujet"
            aria-label="Voir les détails du sujet"
            onClick={() => setShowSubject(true)}
          >
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt={'Un oeil'}
              src={eye}
            />
          </button>
          
          <button
            className={styles.button}
            type="button"
            title="Envoyer un message au plaignant"
            aria-label="Envoyer un message au plaignant"
            onClick={() => setShowMessage(true)}
          >
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt={'Une enveloppe'}
              src={mail}
            />
          </button>
          
          <button
            className={styles.button}
            type="button"
            title="Supprimer ce signalement"
            aria-label="Supprimer ce signalement"
            onClick={deleteReport}
          >
            <Image
              layout="responsive"
              width='32'
              height='32'
              alt={'Une poubelle'}
              src={trash}
            />
          </button>
        </footer>
      </article>

      {showSubject &&
        <Modal
          setShowModal={setShowSubject}
        >
          <ReportedSubject
            report={report}
            getReports={getReports}
          />
        </Modal>
      }

      {showMessage &&
        <Modal
          setShowModal={setShowMessage}
        >
          <AdminMessage
            recipient={report.pseudo}
            userID={report.user_id}
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
    </>
  );
};

export default ReportsCard;