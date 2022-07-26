import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import styles from '../../styles/admin/AdminQuizz.module.scss';

const Quizz: NextPage = ({ userLogged }:any) => {

  const router = useRouter();

  useEffect(() => {
    // If user is not admin, we redirect him to home page
    if(!userLogged.is_admin === true) {
      router.push('/');
    };
  }, []);

  return (
    <>
      <AdminHeader />
    </>
  );
};

export default Quizz;