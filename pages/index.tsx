import type { NextPage } from 'next';
import styles from '../styles/Home.module.scss';

const Home: NextPage = (props) => {

  console.log(props);
  
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        s'Quizz Game
      </h1>

      <p className={styles.text}>
        text normal : Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores eos vel eaque soluta, quis totam explicabo a laborum officiis facilis cumque qui, aspernatur possimus dolores natus ex non sequi exercitationem illo obcaecati inventore minima consequuntur quo! Placeat odio enim sint doloribus animi, sunt rerum asperiores reprehenderit nobis officiis. Vel, ad.
      </p>

      <p className={styles.text_light}>
        text light : Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat esse minima labore ea excepturi ex eaque doloribus vero voluptatem harum.
      </p>

      <input
        className={styles.input}
        type='text'
      />
    </section>
  );
};

export default Home;

