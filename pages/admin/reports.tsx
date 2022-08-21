import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import styles from '../../styles/admin/AdminReports.module.scss';

const Reports: NextPage = ({ isLogged, userLogged }:any) => {

  const router = useRouter();

  useEffect(() => {
    // If user is not admin, we redirect him to home page
    if(isLogged) {
      if(userLogged?.is_admin === true) {
        document.title = "Modérer les Quizz - s'Quizz Game";
      } else {
        router.push('/');
      };
    } else {
      router.push('/');
    };
  }, []);

  return (
    <>
      <AdminHeader />
      
    </>
  );
};

export default Reports;