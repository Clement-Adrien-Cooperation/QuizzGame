import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Admin.module.scss';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

const Admin: NextPage = () => {

  const router = useRouter();

  useEffect(() => {
    // if(userLogged.is_admin === false) {
    //   router.push('/');
    // };
  }, []);

  return (
    <section className={styles.admin}>

      <AdminHeader/>


    </section>
  );
};

export default Admin;