import { Report, User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import ReportsList from '../../components/Admin/Reports/ReportsList/ReportsList';
import styles from '../../styles/admin/AdminReports.module.scss';

type Props = {
  isLogged: boolean,
  userLogged: User
};

const Reports: NextPage<Props> = ({
  isLogged,
  userLogged
}) => {

  const router = useRouter();

  const [usersReported, setUsersReported] = useState<Report[]>([]);
  const [quizzReported, setQuizzReported] = useState<Report[]>([]);
  const [commentsReported, setCommentsReported] = useState<Report[]>([]);
  
  useEffect(() => {
    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        document.title = "Modérer les signalements - s'Quizz Game";
        getReports();

      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  const getReports = async () => {
    const token = localStorage.getItem('token');

    await fetch(`${api}/report/getAll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    })
    .then(async(res) => {
      if(res.status === 200) {
        const data = await res.json();
        reportsSorting(data);
      } else {
        console.log('error');
      };
    })
    .catch((error) => {
      console.log(error);
    });
  };
  
  const reportsSorting = (reports: Report[]) => {
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
            name={"Utilisateurs"}
          />
        }

        {quizzReported.length > 0 &&
          <ReportsList
            reports={quizzReported}
            name={"Quizz"}
          />
        }
        
        {commentsReported.length > 0 &&
          <ReportsList
            reports={commentsReported}
            name={"Commentaires"}
          />
        }
      </section>
    </>
  );
};

export default Reports;