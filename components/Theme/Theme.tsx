import { FunctionComponent, useState } from 'react';
import Image from 'next/image';
import settings from '../../public/icons/settings.svg';
import styles from './Theme.module.scss';
import ColorsPicker from "../ColorsPicker/ColorsPicker";
import DarkMode from "../DarkMode/DarkMode";
import CloseButton from '../CloseButton/CloseButton';

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
        <Image
          src={settings}
          width='32px'
          height='32px'
          layout="responsive"
          alt='Engrenage'
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