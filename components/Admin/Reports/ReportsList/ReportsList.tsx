import { Report } from '@prisma/client';
import { FunctionComponent, ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../../InputField/InputField';
import ReportsCard from '../ReportsCard/ReportsCard';
import styles from './ReportsList.module.scss';

type Props = {
  reports: Report[],
  reportsSorting: (reports: Report[]) => void,
  name: string,
  getReports: () => void,
  setShowLoader: Dispatch<SetStateAction<boolean>>
};

const ReportsLists: FunctionComponent<Props> = ({
  reports,
  reportsSorting,
  name,
  getReports,
  setShowLoader
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
            title="Vous pouvez filtrer les signalements avec le titre du sujet le pseudo du plaignant"
            aria-label="Vous pouvez filtrer les signalements avec le tite du sujet pseudo du plaignant"
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

            const filteredTitle = report.about_title.toLowerCase();
            const filteredPseudo = report.pseudo.toLowerCase();
            const filter = reportFilter.toLowerCase();

            if(filteredPseudo.includes(filter) || filteredTitle.includes(filter)) {
              return (
                <li key={uuidv4()}>
                  <ReportsCard
                    report={report}
                    getReports={getReports}
                    reportsSorting={reportsSorting}
                    setShowLoader={setShowLoader}
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

export default ReportsLists;