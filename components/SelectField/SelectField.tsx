import { ChangeEventHandler, FunctionComponent, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './SelectField.module.scss';

type Props = {
  name: string,
  defaultOption: string,
  options: string[],
  isDisabled: boolean,
  handleFunction: ChangeEventHandler<HTMLSelectElement>
};

const SelectField: FunctionComponent<Props> = ({
  name,
  defaultOption,
  options,
  isDisabled,
  handleFunction
}) => {

  return (
    <div className={styles.field}>

      <select
        className={styles.select}
        id={name}
        onChange={handleFunction}
        disabled={isDisabled}
        required
      >
        <option
          className={styles.option}
          key={uuidv4()}
          value={defaultOption}
        >
          {defaultOption}
        </option>

        {options?.map((option: string) =>
          <option
            value={option}
            key={uuidv4()}
            className={styles.option}
          >
            {option}
          </option>
        )}
      </select>
    </div>
  );
};

export default SelectField;