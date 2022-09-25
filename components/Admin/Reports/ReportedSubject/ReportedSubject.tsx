import { Comment, Question, Quiz, Report, User } from '@prisma/client';
import { FunctionComponent, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { api } from '../../../../api/api';
import styles from './ReportedSubject.module.scss';
import CloseButton from '../../../CloseButton/CloseButton';
import ReportedUser from './ReportedUser';
import ReportedQuiz from './ReportedQuiz';
import ReportedQuestion from './ReportedQuestion';
import ReportedComment from './ReportedComment';

type Props = {
  report: Report,
  setShowSubject: Dispatch<SetStateAction<boolean>>
};

const ReportedSubject: FunctionComponent<Props> = ({
  report,
  setShowSubject
}) => {

  const [title, setTitle] = useState<string>(report.about_title);

  const [user, setUser] = useState<User>();
  const [quiz, setQuiz] = useState<Quiz>();
  const [question, setQuestion] = useState<Question>();
  const [comment, setComment] = useState<Comment>();

  useEffect(() => {
    getSubject();
  }, []);
 
  const getSubject = async() => {

    const token = localStorage.getItem('token');

    const body = {
      about: report.about,
      about_id: report.about_id
    };

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
  };

  const sortingSubject = (data: any) => {
    switch(true) {
      case report.about === "user" :
        setUser(data);
        setTitle(data.pseudo);
      break;
      case report.about === "quiz" :
        setQuiz(data);
        setTitle(data.title);
      break;
      case report.about === "question" :
        setQuestion(data);
        setTitle(data.question);
      break;
      case report.about === "comment" :
        setComment(data);
        setTitle(data.content);
      break;
    };
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.behind}
        onClick={() => setShowSubject(false)}
      ></div>

      <article className={styles.card}>
        <header>
          <h5>
            {title}
          </h5>

          <CloseButton
            handleFunction={() => setShowSubject(false)}
          />
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
        
        {question &&
          <ReportedQuestion
            question={question}
          />
        }
        
        {comment &&
          <ReportedComment
            comment={comment}
          />
        }
      </article>
    </div>
  );
};

export default ReportedSubject;