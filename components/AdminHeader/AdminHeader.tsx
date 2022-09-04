import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import styles from './AdminHeader.module.scss';

const AdminHeader: FunctionComponent = () => {

  const router = useRouter();

  return (
    <header className={styles.header}>

      <h1 className={styles.title}>
        Administration
      </h1>

      <nav className={styles.nav}>

        <ul className={styles.list}>
          <li key={uuidv4()}>
            <Link href='/admin/users'>
              <a
                className={
                  router.pathname == '/admin/users' ?
                    `${styles.button} ${styles.button_active}`
                  :
                    styles.button
                }
              >
                Utilisateurs
              </a>
            </Link>
          </li>
          
          <li key={uuidv4()}>
            <Link href='/admin/quizz'>
              <a
                className={
                  router.pathname == '/admin/quizz' ?
                    `${styles.button} ${styles.button_active}`
                  :
                    styles.button
                }
              >
                Quizz
              </a>
            </Link>
          </li>
          
          <li key={uuidv4()}>
            <Link href='/admin/reports'>
              <a
                className={
                  router.pathname == '/admin/reports' ?
                    `${styles.button} ${styles.button_active}`
                  :
                    styles.button
                }
              >
                Signalements
              </a>
            </Link>
          </li>

          <li key={uuidv4()}>
            <Link href='/admin/categories'>
              <a
                className={
                  router.pathname == '/admin/categories' ?
                    `${styles.button} ${styles.button_active}`
                  :
                    styles.button
                }
              >
                Catégories
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;