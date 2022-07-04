import { useEffect, useState, useRef } from "react";
import styles from './DarkMode.module.scss';

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
    // We can change de hue color on CSS root properties
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

      <span className={styles.span}>Mode sombre</span>

    </section>
  );
};

export default DarkMode;