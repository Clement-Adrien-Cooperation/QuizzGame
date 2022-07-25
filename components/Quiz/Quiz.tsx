import Image from 'next/image';
import styles from './Quiz.module.scss';
import defaultImage from '../../public/icons/defaultImage.svg';

type QuizProps = {
  title: string,
  image: string,
  questions: string[]
};

const Quiz = ({
  title,
  image,
  questions

} :QuizProps) => {

  return (
    <section className={styles.card}>

      <div className={styles.header}>

        <div className={styles.icon}>
          <Image
            src={image === null ? defaultImage : image}
            width='32px'
            height='32px'
            layout="responsive"
            alt='Image du quiz'
          />
        </div>

        <h2 className={styles.title}>
          {title}
        </h2>

      </div>

      <div className={styles.body}>
        <p className={styles.questions}>
          {questions?.length} questions
        </p>
      </div>
    </section>
  );
};

export default Quiz;