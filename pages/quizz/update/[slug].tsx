import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from './UpdateQuiz.module.scss';

const router = useRouter();

const UpdateQuiz: NextPage = ({ isLogged, userLogged }:any) => {

  useEffect(() => {

    document.title = `${router.query.slug} - s'Quizz Game`;

    if(!isLogged) {
      router.push('/');
    };

  }, []);

  return (
    <>
      
    </>
  );
};

export default UpdateQuiz;