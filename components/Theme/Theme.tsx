import type { FunctionComponent } from 'react';
import { useState } from 'react';
import styles from './Theme.module.scss';
import ColorsPickers from "../ColorsPickers/ColorsPickers";
import CloseButton from '../CloseButton/CloseButton';
import DarkMode from "../DarkMode/DarkMode";
import IconSettings from '../../public/Icons/IconSettings';

const Theme: FunctionComponent = () => {

  const [showSettings, setShowSettings] = useState<Boolean>(false);

  return (
    <div className={styles.container}>

      <button
        className={styles.icon}
        type='button'
        title='Ouvrir les paramètres du thème et couleurs'
        aria-label='Ouvrir les paramètres de thème et couleurs'
        onClick={() => setShowSettings(true)}
      >
        <IconSettings />
      </button>

      <section
        className={showSettings ?
          `${styles.settings} ${styles.opened}`
        :
          `${styles.settings}`
        }
      >
        <ColorsPickers />
        <DarkMode />

        <CloseButton
          handleFunction={() => setShowSettings(false)}
        />
      </section>
    </div>
  );
};

export default Theme;