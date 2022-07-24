import { useState } from 'react';
import Image from 'next/image';
import settings from '../../public/icons/settings.svg';
import styles from './Theme.module.scss';
import ColorsPicker from "../ColorsPicker/ColorsPicker";
import DarkMode from "../DarkMode/DarkMode";
import CloseButton from '../CloseButton/CloseButton';

const Theme = () => {

  const [showSettings, setShowSettings] = useState<boolean>(false);

  return (

    <div className={styles.container}>

      {!showSettings && (
        <button
          className={styles.icon}
          type='button'
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
      )}
      
      {showSettings && (
        <section className={styles.settings}>
          <ColorsPicker/>
          <DarkMode />

          <CloseButton
            handleFunction={setShowSettings}
          />
        </section>
      )}
    </div>
  );
};

export default Theme;