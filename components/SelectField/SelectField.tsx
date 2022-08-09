import { ChangeEventHandler } from 'react';
import styles from './SelectField.module.scss';

type SelectFieldProps = {
  name: string,
  defaultOption: string,
  options: string[],
  isDisabled: boolean,
  handleFunction: ChangeEventHandler<HTMLSelectElement>
};

const SelectField = ({
  name,
  defaultOption,
  options,
  isDisabled,
  handleFunction
} : SelectFieldProps ) => {

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
          // value=''
          value={defaultOption}
        >
          {defaultOption}
        </option>

        {options.map((option: string, index: number) =>
          <option
            key={index}
            value={option}
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