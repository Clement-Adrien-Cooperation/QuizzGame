import type { ChangeEventHandler, FunctionComponent, Dispatch, SetStateAction } from 'react';
import InputField from '../InputField/InputField';
import RangeSlider from '../RangeSlider/RangeSlider';
import SelectField from '../SelectField/SelectField';
import styles from './QuizForm.module.scss';

type Props = {
  title: string,
  categoriesList: string[],
  category: string,
  difficulty: string,
  difficultyRange: number,
  rangeColor: string,
  colorDifficulty: string,
  handleChangeDifficulty: ChangeEventHandler<HTMLInputElement>,
  setCategory: Dispatch<SetStateAction<string>>,
  setTitle: Dispatch<SetStateAction<string>>
};

const QuizForm: FunctionComponent<Props> = ({
  title,
  categoriesList,
  category,
  difficulty,
  difficultyRange,
  rangeColor,
  colorDifficulty,
  handleChangeDifficulty,
  setTitle,
  setCategory
}) => {

  return (
    <section className={styles.container}>
      <InputField
        name={'Titre du Quizz'}
        state={title}
        inputID={'quiz-title'}
        type={'text'}
        isDisabled={false}
        required={true}
        autoFocus={true}
        setState={setTitle}
      />

      <SelectField
        name={'Catégorie'}
        state={category}
        options={categoriesList}
        defaultOption={"Choisir une catégorie..."}
        isDisabled={false}
        setState={setCategory}
      />

      <RangeSlider
        name={'Difficulté'}
        value={difficultyRange}
        min={'0'}
        max={'4'}
        gradient={rangeColor}
        difficulty={difficulty}
        color={colorDifficulty}
        handleFunction={handleChangeDifficulty}
      />
    </section>
  );
};

export default QuizForm;