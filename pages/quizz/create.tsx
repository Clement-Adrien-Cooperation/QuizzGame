import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/quizz/CreateQuizz.module.scss';
import Warning from '../../components/Warning/Warning';
import Loader from '../../components/Loader/Loader';
import QuizForm from '../../components/QuizForm/QuizForm';
import QuizEdit from '../../components/QuizEdit/QuizEdit';

const CreateQuizz: NextPage = ({ isLogged, userLogged }:any) => {

  const router = useRouter();

  useEffect(() => {

    document.title = "Créer un quiz - s'Quizz Game";

    if(!isLogged) {
      router.push('/');
    };

  }, []);

  return (
    <>
      <QuizEdit
        userLogged={userLogged}
      />
    </>
  );
};

export default CreateQuizz;