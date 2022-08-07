import InputField from '../InputField/InputField';
import RangeSlider from '../RangeSlider/RangeSlider';
import SelectField from '../SelectField/SelectField';
import styles from './QuizForm.module.scss';

type QuizFormProps = {
  title: string,
  categoryList: string[],
  langList: string[],
  difficulty: string,
  difficultyRange: number,
  rangeColor: string,
  colorDifficultyName: string,
  handleChangeDifficulty: Function,
  handleChangeTitle: Function,
  handleChangeCategory: Function,
  handleChangeLang: Function
};

const QuizForm = ({
  title,
  categoryList,
  langList,
  difficulty,
  difficultyRange,
  rangeColor,
  colorDifficultyName,
  handleChangeDifficulty,
  handleChangeTitle,
  handleChangeCategory,
  handleChangeLang
}: QuizFormProps) => {

  return (
    <section className={styles.container}>
      <InputField
        name={'Nom du Quizz'}
        state={title}
        inputID={'title'}
        type={'text'}
        isDisabled={false}
        handleFunction={(e) => handleChangeTitle(e)}
      />

      <SelectField
        name={'Catégorie'}
        defaultOption={'Choisir une catégorie...'}
        options={categoryList}
        isDisabled={false}
        handleFunction={(e) => handleChangeCategory(e)}
      />

      <SelectField
        name={'Langue'}
        defaultOption={'Choisir une langue...'}
        options={langList}
        isDisabled={false}
        handleFunction={(e) => handleChangeLang(e)}
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