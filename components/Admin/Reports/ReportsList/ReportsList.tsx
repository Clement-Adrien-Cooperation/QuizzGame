import type { FunctionComponent } from 'react';
import type { Report } from '@prisma/client';
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../../InputField/InputField';
import ReportsCard from '../ReportsCard/ReportsCard';
import styles from './ReportsList.module.scss';

type Props = {
  reports: Report[],
  reportsSorting: (reports: Report[]) => void,
  name: string,
  getReports: () => void
};

const ReportsLists: FunctionComponent<Props> = ({
  reports,
  reportsSorting,
  name,
  getReports
}) => {

  const [filter, setFilter] = useState<string>('');

  const displayedReports = useMemo(() => {
    if(filter) {
      return reports.filter((report: Report) => {
        return report.about_title.toLowerCase().includes(filter.toLowerCase())
        || report.pseudo.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return reports;

  }, [filter, reports]);

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
            title="Vous pouvez filtrer les signalements avec le titre du sujet le pseudo du plaignant"
            aria-label="Vous pouvez filtrer les signalements avec le tite du sujet pseudo du plaignant"
          >
            <InputField
              name={'Filtrer...'}
              state={filter}
              inputID={'filter'}
              type={'search'}
              isDisabled={false}
              required={true}
              autoFocus={false}
              setState={setFilter}
            />
          </div>
        }

        <ul className={styles.list}>
          {displayedReports.map(report =>
            <li key={uuidv4()}>
              <ReportsCard
                report={report}
                getReports={getReports}
                reportsSorting={reportsSorting}
              />
            </li>
          )}
        </ul>
      </section>
    </section>
  );
};

export default ReportsLists;