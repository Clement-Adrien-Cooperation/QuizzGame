import { Report } from '@prisma/client';
import { FunctionComponent, ChangeEvent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../../InputField/InputField';
import ReportedCard from '../ReportedCard/ReportedCard';
import styles from './ReportedList.module.scss';

type Props = {
  reports: Report[],
  name: string
};

const ReportedList: FunctionComponent<Props> = ({
  reports,
  name
}) => {

  const [reportFilter, setReportFilter] = useState<string>('');

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setReportFilter(event.target.value);
  };

  return (
    <section
      className={styles.container}
      id={reports[0].about}
    >
      <header className={styles.header}>
        <h3 className={styles.title}>
          {name} signalés
        </h3>
      </header>

      <section className={styles.reports}>
        {reports.length > 10 &&
          <div
            className={styles.input}
            title="Vous pouvez filtrer les signalements avec le pseudo du plaignant"
            aria-label="Vous pouvez filtrer les signalements avec le pseudo du plaignant"
          >
            <InputField
              name={'Filtrer...'}
              state={reportFilter}
              handleFunction={handleChangeFilter}
              inputID={'filter'}
              type={'text'}
              isDisabled={false}
              required={true}
              autoFocus={false}
            />
          </div>
        }

        <ul className={styles.list}>
          {reports.map(report => {

            const filteredPseudo = report.pseudo.toLocaleLowerCase();
            const filter = reportFilter.toLocaleLowerCase();

            if(filteredPseudo.includes(filter)) {
              return (
                <li key={uuidv4()}>
                  <ReportedCard
                    report={report}
                  />
                </li>
              );
            };
          })}
        </ul>
      </section>
    </section>
  );
};

export default ReportedList;