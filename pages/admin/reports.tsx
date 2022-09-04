import { User } from '@prisma/client';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminHeader from '../../components/AdminHeader/AdminHeader';
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