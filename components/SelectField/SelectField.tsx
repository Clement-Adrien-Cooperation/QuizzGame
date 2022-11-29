import type { FunctionComponent, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './SelectField.module.scss';

type Props = {
  name: string,
  options: string[],
  defaultOption: string,
  isDisabled: boolean,
  state: string,
  setState: Dispatch<SetStateAction<string>>
};

const SelectField: FunctionComponent<Props> = ({
  name,
  options,
  defaultOption,
  isDisabled,
  state,
  setState
}) => {

  return (
    <div className={styles.field}>

      <select
        className={styles.select}
        id={name}
        onChange={e => setState(e.target.value)}
        disabled={isDisabled}
        required
      >
        <option
          className={styles.option}
          key={uuidv4()}
          value={defaultOption}
        >
          {state ? state : defaultOption}
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