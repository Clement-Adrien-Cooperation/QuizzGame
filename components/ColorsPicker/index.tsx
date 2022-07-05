import { useEffect, useState } from 'react';
import styles from './ColorsPicker.module.scss';

const ColorsPicker = () => {

  const [hue, setHue] = useState('250');

  useEffect(() => {
    // Get the previous favorite color on local storage
    const previousTheme = localStorage.getItem('favorite-color');

    // If there is a previous favorite color saved,
    if(previousTheme) {
      // We can change the hue color
      changeColor(previousTheme);
      setHue(previousTheme);
    };
  }, []);

  const changeColor = (newHue: string) => {
    // We can change de hue color on CSS root properties
    document.documentElement.style.setProperty('--hue-color', newHue);

    // Then we save the new favorite color in the local storage
    localStorage.setItem('favorite-color', newHue);

    // & in the state
    setHue(newHue);
  };

  return (
    <section className={styles.container}>

      <input
        className={styles.input}
        type='radio'
        name='color'
        id='purple'
        defaultChecked={hue === '250' ? true : false}
        readOnly
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
        id='blue'
        defaultChecked={hue === '230' ? true : false}
        readOnly
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
        defaultChecked={hue === '340' ? true : false}
        readOnly
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
        defaultChecked={hue === '360' ? true : false}
        readOnly
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
        defaultChecked={hue === '25' ? true : false}
        readOnly
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

export default ColorsPicker;