import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import ReportForm from './ReportForm/ReportForm';
import styles from './Report.module.scss';
import Modal from '../Modal/Modal';

type Props = {
  user_id: string,
  pseudo: string,
  about: string,
  about_id: string,
  about_title: string,
  setShowReportForm: Dispatch<SetStateAction<boolean>>
};

const Report: FunctionComponent<Props> = ({
  user_id,
  pseudo,
  about,
  about_id,
  about_title,
  setShowReportForm
}) => {

  return (
    <Modal
      setShowModal={setShowReportForm}
    >
      <section className={styles.container}>
        <header className={styles.header}>
          <h4 className={styles.title}>
            Signalement
          </h4>
        </header>
        
        <ReportForm
          user_id={user_id}
          pseudo={pseudo}
          about={about}
          about_id={about_id}
          about_title={about_title}
        />
      </section>
    </Modal>
  );
};

export default Report;