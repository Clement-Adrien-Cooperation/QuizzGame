import { useEffect, useState } from "react";
import Image from 'next/image';
import styles from './DarkMode.module.scss';

import sun from '../../public/icons/sun.svg';
import moon from '../../public/icons/moon.svg';
import CheckButton from "../CheckButton/CheckButton";

const DarkMode = () => {

  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Get the previous favorite theme on local storage
    const previousTheme = localStorage.getItem('favorite-theme');

    // If the previous theme was 'dark'
    if(previousTheme === 'dark') {
      // Toggle state (false by default)
      setDarkMode(!darkMode);
    };
  }, []);

  // This useEffect watch state of dark mode
  useEffect(() => {

    // If dark mode is on
    if(darkMode) {
      // Add classlist to body for colors in CSS
      document.body.classList.add('dark');

      // & save it as favorite theme in local storage
      localStorage.setItem('favorite-theme', 'dark');

    } else {

      // If dark mode is off, remove classlist from body
      document.body.classList.remove('dark');

      // & save 'light' mode as favorite
      localStorage.setItem('favorite-theme', 'light');
    };
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <section className={styles.container}>

      <CheckButton
        state={darkMode}
        title={darkMode ? 'Activer le mode clair' : 'Activer mode sombre'}
        clickFunction={toggleTheme}
      />

      <div className={styles.icon}>
        <Image
          src={darkMode ? moon : sun}
          width='32px'
          height='32px'
          layout="responsive"
          alt='Changer de thème'
        />
      </div>

      <span className={styles.span}>
        Mode sombre
      </span>

    </section>
  );
};

export default DarkMode;