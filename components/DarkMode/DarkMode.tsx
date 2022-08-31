import { useEffect, useState } from "react";
import styles from './DarkMode.module.scss';
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

  return (
    <section className={styles.container}>

      <CheckButton
        id={'switch-theme'}
        label={"Mode sombre"}
        title={darkMode ? 'Activer le mode clair' : 'Activer mode sombre'}
        state={darkMode}
        setState={setDarkMode}
      />

    </section>
  );
};

export default DarkMode;