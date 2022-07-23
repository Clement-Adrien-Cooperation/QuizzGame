import { useEffect, useState } from 'react';
import styles from './ColorsPicker.module.scss';

import ColorPicker from '../ColorPicker';

const ColorsPicker = () => {

  const [hue, setHue] = useState<string>('250');

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

      <ColorPicker
        hue={hue}
        colorName={'purple'}
        hueColor={'250'}
        changeColor={changeColor}
      >
        <span className={styles.picker_purple}/>
      </ColorPicker>

      <ColorPicker
        hue={hue}
        colorName={'blue'}
        hueColor={'230'}
        changeColor={changeColor}
      >
        <span className={styles.picker_blue}/>
      </ColorPicker>

      <ColorPicker
        hue={hue}
        colorName={'pink'}
        hueColor={'340'}
        changeColor={changeColor}
      >
        <span className={styles.picker_pink}/>
      </ColorPicker>

      <ColorPicker
        hue={hue}
        colorName={'red'}
        hueColor={'360'}
        changeColor={changeColor}
      >
        <span className={styles.picker_red}/>
      </ColorPicker>

      <ColorPicker
        hue={hue}
        colorName={'orange'}
        hueColor={'25'}
        changeColor={changeColor}
      >
        <span className={styles.picker_orange}/>
      </ColorPicker>

    </section>
  );
};

export default ColorsPicker;