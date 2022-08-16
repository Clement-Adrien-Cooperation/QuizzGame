import { useState } from 'react';
import Image from 'next/image';
import settings from '../../public/icons/settings.svg';
import styles from './Theme.module.scss';
import ColorsPicker from "../ColorsPicker/ColorsPicker";
import DarkMode from "../DarkMode/DarkMode";
import CloseButton from '../CloseButton/CloseButton';

const Theme = () => {

  const [showSettings, setShowSettings] = useState<Boolean>(false);

  return (
    <div className={styles.container}>

      <button
        className={styles.icon}
        type='button'
        aria-label='Ouvrir les paramètres de couleurs et thème'
        onClick={() => setShowSettings(true)}
      >
        <Image
          src={settings}
          width='32px'
          height='32px'
          layout="responsive"
          alt='Ouvrir les paramètres'
        />
      </button>

      <section
        className={showSettings ?
          `${styles.settings} ${styles.opened}`
        :
          `${styles.settings}`
        }
      >
        <ColorsPicker/>
        <DarkMode />

        <CloseButton
          handleFunction={() => setShowSettings(false)}
        />
      </section>
    </div>
  );
};

export default Theme;