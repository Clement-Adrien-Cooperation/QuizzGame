import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../../styles/Admin.module.scss';
import AdminHeader from '../../components/AdminHeader/AdminHeader';

type UserTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean,
};

const Admin: NextPage = ({ userLogged }:any) => {

  const router = useRouter();

  useEffect(() => {
    if(!userLogged.is_admin === true) {
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