import type { FunctionComponent } from 'react'
import type { Quiz } from '@prisma/client';
import { useEffect, useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import styles from './QuizzSlider.module.scss';
import QuizCard from '../QuizCard/QuizCard';
import IconArrow from '../../public/Icons/IconArrow';

// 400px is the width of a quiz card
const cardWidth = 400; // in QuizCard.module.scss => .card
// 20px is the gap between each card
const cardsGap = 20; // in QuizzSlider.module.scss => .list
// 200px between navbar & slider
const navbarMargin = 200 // in QuizzSlider.module.scss => .container
// 350px is the navbar width
const navbarWidth = 350 // in _vars.scss => --navbar-width

type Props = {
  quizz: Quiz[],
  title: string
};

const QuizzSlider: FunctionComponent<Props> = ({
  quizz,
  title
}) => {

  const sliderRef = useRef<HTMLUListElement>(null);

  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [disabledButtons, setDisabledButtons] = useState<boolean>(false);

  const listWidth = quizz.length * (cardWidth + cardsGap);

  const getVisibleQuizzWidth = () => {
    const clientWidth = document.body.clientWidth;
    const visibleQuizzWidth = clientWidth - (navbarWidth + navbarMargin);
    return Math.floor(visibleQuizzWidth);
  };

  useEffect(() => {
    if(currentPosition >= 0) {
      setShowLeftArrow(false);
    };

    const visibleQuizzWidth = getVisibleQuizzWidth();

    if(listWidth > visibleQuizzWidth
    && (currentPosition - visibleQuizzWidth) > -listWidth) {
      setShowRightArrow(true);
    } else {
      setShowRightArrow(false);
    };
  }, [currentPosition]);

  const slideToLeft = () => {
    setShowLeftArrow(true);
    setDisabledButtons(true);

    const visibleQuizzWidth = getVisibleQuizzWidth();
    const newScroll = visibleQuizzWidth - cardsGap * 2;

    if((currentPosition - newScroll) > (-listWidth + newScroll)) {
      setCurrentPosition(currentPosition => currentPosition - newScroll);
      sliderRef.current?.setAttribute('style', `transform: translateX(${currentPosition - newScroll}px)`);
    } else {
      const newPosition = -listWidth + visibleQuizzWidth;
      setCurrentPosition(newPosition);
      sliderRef.current?.setAttribute('style', `transform: translateX(${newPosition}px)`);
    };

    // Time for animation is 500ms
    setTimeout(() => {
      setDisabledButtons(false);
    }, 500);
  };

  const slideToRight = () => {
    setShowRightArrow(true);
    setDisabledButtons(true);

    const visibleQuizzWidth = getVisibleQuizzWidth();
    const newScroll = visibleQuizzWidth - cardsGap * 2;

    if((currentPosition + newScroll) >= 0) {
      setCurrentPosition(0);
      sliderRef.current?.setAttribute('style', `transform: translateX(0)px`);
    } else {
      setCurrentPosition(currentPosition => currentPosition + newScroll);
      sliderRef.current?.setAttribute('style', `transform: translateX(${currentPosition + newScroll}px)`);
    };

    // Time for animation is 500ms
    setTimeout(() => {
      setDisabledButtons(false);
    }, 500);
  };

  return (
    <section className={styles.container}>
      <header>
        <h2 className={styles.title}>
          {title}
        </h2>
      </header>

      {showLeftArrow &&
        <button
          className={`${styles.arrow} ${styles.arrow_left}`}
          type="button"
          title="Faire glisser les quizz vers la gauche"
          aria-label="Faire glisser les quizz vers la gauche"
          disabled={disabledButtons}
          onClick={slideToRight}
        >
          <IconArrow color="var(--white)" />
        </button>
      }

      <ul
        className={styles.list}
        // style={{ transform: `translateX(${currentPosition}px)` }}
        ref={sliderRef}
      >
        {quizz.map(quiz =>
          <li key={uuidv4()}>
            <QuizCard
              quiz={quiz}
            />
          </li>
        )}
      </ul>

      {showRightArrow &&
        <button
          className={`${styles.arrow} ${styles.arrow_right}`}
          type="button"
          title="Faire glisser les quizz vers la droite"
          aria-label="Faire glisser les quizz vers la droite"
          disabled={disabledButtons}
          onClick={slideToLeft}
        >
          <IconArrow color="var(--white)" />
        </button>
      }
    </section>
  );
};

export default QuizzSlider;