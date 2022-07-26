import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './AdminHeader.module.scss';

const AdminHeader = () => {

  const router = useRouter();

  return (
    <header className={styles.header}>

      <h1 className={styles.title}>
        Administration
      </h1>

      <nav className={styles.nav}>

        <ul className={styles.list}>
          <li>
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
          
          <li>
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
          
          <li>
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
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;