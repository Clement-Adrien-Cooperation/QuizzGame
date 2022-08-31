import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
import styles from '../../styles/admin/AdminReports.module.scss';

const Reports: NextPage = ({
  isLogged,
  userLogged,
  checkToken
}:any) => {

  const router = useRouter();
  
  useEffect(() => {

    if(isLogged) {
      if(userLogged.is_banished) {
        router.push('/banned');
      } else if(userLogged.is_admin) {

        document.title = "Modérer les quizz - s'Quizz Game";

        // function getReports(); ?

      } else {
        router.push('/');
      };
    } else {
      const token = localStorage.getItem('token');

      if(token) {
        checkToken(token);
      } else {
        router.push('/');
      };
    };
  }, []);

  return (
    <>
      <AdminHeader />
      
    </>
  );
};

export default Reports;