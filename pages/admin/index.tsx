import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../../styles/Admin.module.scss';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const Admin: NextPage = ({ userLogged }:any) => {

  const router = useRouter();

  useEffect(() => {

    document.title = "Administration - s'Quizz Game";
    
    // If user is not admin, we redirect him to home page
    if(userLogged?.is_admin === true) {
      return;
    } else {
      router.push('/');
    };
  }, []);

  return (
    <section className={styles.admin}>

      <AdminHeader/>


    </section>
  );
};

export default Admin;