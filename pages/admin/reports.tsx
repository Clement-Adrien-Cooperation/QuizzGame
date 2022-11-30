import type { Dispatch, SetStateAction } from 'react';
import type { NextPage } from 'next';
import type { Report, User } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../api/api';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import ReportsList from '../../components/Admin/Reports/ReportsList/ReportsList';
import styles from '../../styles/admin/AdminReports.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User,
  setPageTitle: Dispatch<SetStateAction<string>>
};

const Reports: NextPage<Props> = ({
  isLogged,
  userLogged,
  setPageTitle
}) => {

  const router = useRouter();

  const [usersReported, setUsersReported] = useState<Report[]>([]);
  const [quizzReported, setQuizzReported] = useState<Report[]>([]);
  const [commentsReported, setCommentsReported] = useState<Report[]>([]);

  useEffect(() => {
    if(isLogged) {
      // if user is banished
      if(userLogged.is_banished) {
        // we push him to "banned" page
        router.push('/banned');
      } else if(userLogged.is_admin) {
        // if user is admin, change title of document
        setPageTitle("Modérer les signalements - s'Quizz Game");
        // and get reports
        getReports();
      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getReports = async () => {
    // Get token from local storage
    const token = localStorage.getItem('token');

    // Get all reports from API
    await fetch(`${api}/report/getAll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      if(res.status === 200) {
        const reports = await res.json();
        // sort reports
        reportsSorting(reports);
      } else {
        console.log('error');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const reportsSorting = (reports: Report[]) => {

    // sort data by "user", "quizz" or "comment"
    const users = reports.filter(report => report.about === 'user');
    setUsersReported(users);

    const quizz = reports.filter(report => report.about === 'quiz');
    setQuizzReported(quizz);

    const comments = reports.filter(report => report.about === 'comment');
    setCommentsReported(comments);
  };

  return (
    <>
      <AdminHeader />

      <header className={styles.header}>
        <h2 className={styles.title}>
          Signalements
        </h2>

        {usersReported.length === 0 &&
        quizzReported.length === 0 &&
        commentsReported.length === 0 &&
          <p className={styles.text}>
            Aucun signalement à afficher
          </p>
        }

        <div className={styles.buttons}>
          {usersReported.length > 0 &&
            <a
              className={styles.link}
              title="Aller aux utilisateurs signalés"
              aria-label="Aller aux utilisateurs signalés"
              href='#user'
            >
              Utilisateurs
            </a>
          }

          {quizzReported.length > 0 &&
            <a
              className={styles.link}
              title="Aller aux quizz signalés"
              aria-label="Aller aux quizz signalés"
              href='#quiz'
            >
              Quizz
            </a>
          }

          {commentsReported.length > 0 &&
            <a
              className={styles.link}
              title="Aller aux commentaires signalés"
              aria-label="Aller aux commentaires signalés"
              href='#comment'
            >
              Commentaires
            </a>
          }
        </div>
      </header>

      <section className={styles.reports}>

        {usersReported.length > 0 &&
          <ReportsList
            reports={usersReported}
            reportsSorting={reportsSorting}
            name={"Utilisateurs"}
            getReports={getReports}
          />
        }

        {quizzReported.length > 0 &&
          <ReportsList
            reports={quizzReported}
            reportsSorting={reportsSorting}
            name={"Quizz"}
            getReports={getReports}
          />
        }

        {commentsReported.length > 0 &&
          <ReportsList
            reports={commentsReported}
            reportsSorting={reportsSorting}
            name={"Commentaires"}
            getReports={getReports}
          />
        }
      </section>
    </>
  );
};

export default Reports;