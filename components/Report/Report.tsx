import { FunctionComponent, Dispatch, SetStateAction, useState } from 'react';
import CloseButton from '../CloseButton/CloseButton';
import ReportForm from './ReportForm/ReportForm';
import styles from './Report.module.scss';

type Props = {
  pseudo: string,
  about: string,
  about_id: string,
  about_title: string,
  setShowReportForm: Dispatch<SetStateAction<boolean>>,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const Report: FunctionComponent<Props> = ({
  pseudo,
  about,
  about_id,
  about_title,
  setShowReportForm,
  setShowLoader
}) => {

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
        
        <ReportForm
          pseudo={pseudo}
          about={about}
          about_id={about_id}
          about_title={about_title}
          setShowLoader={setShowLoader}
        />

      </section>
    </div>
  );
};

export default Report;