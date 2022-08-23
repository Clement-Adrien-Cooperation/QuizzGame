import InputField from '../InputField/InputField';
import RangeSlider from '../RangeSlider/RangeSlider';
import SelectField from '../SelectField/SelectField';
import styles from './QuizForm.module.scss';

type QuizFormProps = {
  title: string,
  categoryList: string[],
  defaultCategory: string,
  difficulty: string,
  difficultyRange: number,
  rangeColor: string,
  colorDifficultyName: string,
  handleChangeDifficulty: Function,
  handleChangeTitle: Function,
  handleChangeCategory: Function
};

const QuizForm = ({
  title,
  categoryList,
  defaultCategory,
  difficulty,
  difficultyRange,
  rangeColor,
  colorDifficultyName,
  handleChangeDifficulty,
  handleChangeTitle,
  handleChangeCategory
}: QuizFormProps) => {

  return (
    <section className={styles.container}>
      <InputField
        name={'Nom du Quizz'}
        state={title}
        inputID={'title'}
        type={'text'}
        isDisabled={false}
        required={true}
        autoFocus={true}
        handleFunction={(e) => handleChangeTitle(e)}
      />

      <SelectField
        name={'Catégorie'}
        defaultOption={defaultCategory}
        options={categoryList}
        isDisabled={false}
        handleFunction={(e) => handleChangeCategory(e)}
      />

      <RangeSlider
        name={'Difficulté'}
        value={difficultyRange}
        min={'0'}
        max={'4'}
        gradient={rangeColor}
        difficulty={difficulty}
        colorDifficultyName={colorDifficultyName}
        handleFunction={handleChangeDifficulty}
      />
    </section>
  );
};

export default QuizForm;