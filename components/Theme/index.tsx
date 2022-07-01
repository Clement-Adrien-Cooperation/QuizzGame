import { useEffect } from 'react';
import styles from './Theme.module.scss';

const Theme = () => {

  useEffect(() => {
    // Get the previous favorite theme on local storage
    const previousTheme = localStorage.getItem('favorite-theme');

    // If there is a previous favorite theme saved,
    if(previousTheme) {
      // We can change the hue color
      changeColor(previousTheme);
    };
  }, []);

  const changeColor = (newHue: string) => {
    // We can change de hue color on CSS root properties
    document.documentElement.style.setProperty('--hue-color', newHue);

    // Then we save the new favorite theme in the local storage
    localStorage.setItem('favorite-theme', newHue);
  };

  return (
    <section className={styles.container}>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='purple'
      />
      <label
        className={styles.picker}
        htmlFor='purple'
        onClick={() => {changeColor('250')}}
      >
        <span className={styles.picker_purple}/>
      </label>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='green'
      />
      <label
        className={styles.picker}
        htmlFor='green'
        onClick={() => {changeColor('120')}}
      >
        <span className={styles.picker_green}/>
      </label>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='blue'
      />
      <label
        className={styles.picker}
        htmlFor='blue'
        onClick={() => {changeColor('230')}}
      >
        <span className={styles.picker_blue}/>
      </label>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='pink'
      />
      <label
        className={styles.picker}
        htmlFor='pink'
        onClick={() => {changeColor('340')}}
      >
        <span className={styles.picker_pink}/>
      </label>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='red'
      />
      <label
        className={styles.picker}
        htmlFor='red'
        onClick={() => {changeColor('360')}}
      >
        <span className={styles.picker_red}/>
      </label>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='orange'
      />
      <label
        className={styles.picker}
        htmlFor='orange'
        onClick={() => {changeColor('25')}}
      >
        <span className={styles.picker_orange}/>
      </label>
    </section>
  );
};

export default Theme;