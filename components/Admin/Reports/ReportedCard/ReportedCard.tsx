import { Report } from '@prisma/client';
import { FunctionComponent } from 'react';
import styles from './ReportedCard.module.scss';
import eye from '../../../../public/icons/eye_visible.svg';
import trash from '../../../../public/icons/delete.svg';
import mail from '../../../../public/icons/mail.svg';
import Image from 'next/image';

type Props = {
  report: Report
};

const ReportedCard: FunctionComponent<Props> = ({
  report
}) => {

  return (
    <article className={styles.card}>
      <header>
        <h4 className={styles.pseudo}>
          Signalé par {report.pseudo}
        </h4>

        <span>
          le {report.date}
        </span>
      </header>

      <section className={styles.details}>

        <p>
          {report.message}
        </p>

      </section>

      <footer className={styles.footer}>
        <button
          className={styles.button}
          type="button"
          title="Voir les détails du sujet"
          aria-label="Voir les détails du sujet"
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt={'Un oeil'}
            src={eye}
          />
        </button>
        
        <button
          className={styles.button}
          type="button"
          title="Envoyer un message au plaignant"
          aria-label="Envoyer un message au plaignant"
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt={'Une enveloppe'}
            src={mail}
          />
        </button>
        
        <button
          className={styles.button}
          type="button"
          title="Supprimer ce signalement"
          aria-label="Supprimer ce signalement"
        >
          <Image
            layout="responsive"
            width='32'
            height='32'
            alt={'Une poubelle'}
            src={trash}
          />
        </button>
      </footer>
    </article>
  );
};

export default ReportedCard;