import type { FunctionComponent } from 'react';
import type { Comment, Quiz, Report, User } from '@prisma/client';
import { useState, useEffect } from 'react';
import { api } from '../../../../api/api';
import styles from './ReportedSubject.module.scss';
import ReportedUser from './ReportedUser';
import ReportedQuiz from './ReportedQuiz';
import ReportedComment from './ReportedComment';
import Loader from '../../../Loader/Loader';

type Props = {
  report: Report,
  getReports: () => void
};

const ReportedSubject: FunctionComponent<Props> = ({
  report,
  getReports
}) => {

  const [title, setTitle] = useState<string>(report.about_title);

  const [user, setUser] = useState<User>();
  const [quiz, setQuiz] = useState<Quiz>();
  const [comment, setComment] = useState<Comment>();
  const [showLoader, setShowLoader] = useState<boolean>(false);

  useEffect(() => {
    getSubject();
  }, []);
 
  const getSubject = async() => {
    setShowLoader(true);

    // get token from local storage
    const token = localStorage.getItem('token');

    // set up body for api request
    const body = {
      about: report.about,
      about_id: report.about_id
    };

    // get our subject (quiz, user or comment) from API
    await fetch(`${api}/report/getSubject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `${token}`
      },
      body: JSON.stringify(body)
    })
    .then(async(res) => {
      if(res.status === 200) {
        const data = await res.json();
        sortingSubject(data);
      };
    })
    .catch((error) => {
      console.log(error);
    });

    setShowLoader(false);
  };
  
  const sortingSubject = (data: any) => {
    // sort subject
    switch(true) {
      case report.about === "user" :
        setUser(data);
        setTitle(data.pseudo);
      break;
      case report.about === "quiz" :
        setQuiz(data);
        setTitle(data.title);
      break;
      case report.about === "comment" :
        setComment(data);
        setTitle(data.content);
      break;
    };
  };

  return (
    <>
      <article className={styles.card}>
        <header>
          <h5 className={styles.title}>
            {title}
          </h5>
        </header>
        
        {user &&
          <ReportedUser
            user={user}
          />
        }
        
        {quiz &&
          <ReportedQuiz
            quiz={quiz}
          />
        }
        
        {comment &&
          <ReportedComment
            comment={comment}
            getReports={getReports}
          />
        }
      </article>

      {showLoader &&
        <Loader />
      }
    </>
  );
};

export default ReportedSubject;