import type { FunctionComponent } from 'react'
import Image from 'next/image';
import styles from './ImageButton.module.scss';

type Props = {
  title: string,
  img: string,
  alt: string,
  handleFunction: () => void
};

const ImageButton: FunctionComponent<Props> = ({
  title,
  img,
  alt,
  handleFunction
}) => {

  return (
      <button
        className={styles.button}
        type="button"
        title={title}
        aria-label={title}
        onClick={handleFunction}
      >
        <Image
          className={styles.icon}
          layout="responsive"
          width='32'
          height='32'
          alt={alt}
          src={img}
          loading="lazy"
        />
      </button>
  );
};

export default ImageButton;