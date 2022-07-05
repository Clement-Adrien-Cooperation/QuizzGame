import { useEffect, useState, useRef } from "react";
import Image from 'next/image';
import styles from './DarkMode.module.scss';

import sun from '../../public/icons/sun.svg';
import moon from '../../public/icons/moon.svg';

const DarkMode = () => {

  const [darkMode, setDarkMode] = useState(false);

  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get the previous favorite theme on local storage
    const previousTheme = localStorage.getItem('favorite-theme');

    // If there is a previous favorite theme saved,
    if(previousTheme) {
      // We can change the theme
      toggleTheme(previousTheme);
    };
  }, []);
  

  const toggleTheme = (newTheme: string) => {
    // We can change the hue color on CSS root properties
    // Then we save the new favorite theme in the local storage
    if(newTheme === 'dark') {
      document.body.classList.add('dark');
      localStorage.setItem('favorite-theme', newTheme);
      buttonRef.current?.classList.toggle('checked');
      setDarkMode(true);

    } else if(newTheme === 'light') {
      document.body.classList.remove('dark');
      localStorage.setItem('favorite-theme', newTheme);
      buttonRef.current?.classList.toggle('checked');
      setDarkMode(false);

    };
  };

  return (
    <section className={styles.container}>

      <input
        className={styles.input}
        type='checkbox'
        id='switch'
        checked={darkMode}
        readOnly
      />

      <label
        className={styles.label}
        htmlFor="switch"
        onClick={() => {
          darkMode ? toggleTheme('light') : toggleTheme('dark');
        }}
      ></label>

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