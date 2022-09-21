import { Report, User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../api/api';
import AdminHeader from '../../components/Admin/AdminHeader/AdminHeader';
import ReportedList from '../../components/Admin/Reports/ReportedList/ReportedList';
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
  const [questionsReported, setQuestionsReported] = useState<Report[]>([]);
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

    const questions = reports.filter(report => report.about === 'question');
    setQuestionsReported(questions);

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
              title="Allez aux utilisateurs signalés"
              aria-label="Allez aux utilisateurs signalés"
              href='#user'
            >
              Utilisateurs
            </a>
          }

          {quizzReported.length > 0 &&
            <a
              className={styles.link}
              title="Allez aux quizz signalés"
              aria-label="Allez aux quizz signalés"
              href='#quiz'
            >
              Quizz
            </a>
          }

          {questionsReported.length > 0 &&
            <a
              className={styles.link}
              title="Allez aux questions signalées"
              aria-label="Allez aux questions signalées"
              href='#question'
            >
              Questions
            </a>
          }

          {commentsReported.length > 0 &&
            <a
              className={styles.link}
              title="Allez aux commentaires signalés"
              aria-label="Allez aux commentaires signalés"
              href='#comment'
            >
              Commentaires
            </a>
          }
        </div>
      </header>

      <section className={styles.reports}>

        {usersReported.length > 0 &&
          <ReportedList
            reports={usersReported}
            name={"Utilisateurs"}
          />
        }

        {quizzReported.length > 0 &&
          <ReportedList
            reports={quizzReported}
            name={"Quizz"}
          />
        }
        
        {questionsReported.length > 0 &&
          <ReportedList
            reports={questionsReported}
            name={"Questions"}
          />
        }
        
        {commentsReported.length > 0 &&
          <ReportedList
            reports={commentsReported}
            name={"Commentaires"}
          />
        }
      </section>
    </>
  );
};

export default Reports;