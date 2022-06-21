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
      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('done')
          changeColor();
        }}
      >

        <input
          type='color'
          onChange={(e) => {
          }}
        />

        <button type='submit'>
          Valider
        </button>
      </form> */}

      <input
        className={styles.button_purple}
        type='button'
        onClick={() => {changeColor('250')}}
      />

      <input
        className={styles.button_green}
        type='button'
        onClick={() => {changeColor('142')}}
      />

      <input
        className={styles.button_blue}
        type='button'
        onClick={() => {changeColor('230')}}
      />

      <input
        className={styles.button_pink}
        type='button'
        onClick={() => {changeColor('340')}}
      />

      <input
        className={styles.button_red}
        type='button'
        onClick={() => {changeColor('360')}}
      />

      <input
        className={styles.button_yellow}
        type='button'
        onClick={() => {changeColor('60')}}
      />

      <input
        className={styles.button_orange}
        type='button'
        onClick={() => {changeColor('25')}}
      />
    </section>
  );
};

export default Theme;