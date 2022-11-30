import type { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
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
          <li
            key={uuidv4()}
            title="Gérer les utilisateurs"
            aria-label="Gérer les utilisateurs"
          >
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

          <li
            key={uuidv4()}
            title="Gérer les quizz"
            aria-label="Gérer les quizz"
          >
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

          <li
            key={uuidv4()}
            title="Gérer les catégories"
            aria-label="Gérer les catégories"
          >
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

          <li
            key={uuidv4()}
            title="Gérer les signalements"
            aria-label="Gérer les signalements"
          >
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