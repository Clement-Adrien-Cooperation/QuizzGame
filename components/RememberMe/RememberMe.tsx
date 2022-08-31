import styles from './RememberMe.module.scss';

type RememberMeProps = {
  rememberMe: boolean,
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>
};

const RememberMe = ({
  rememberMe,
  setRememberMe
}: RememberMeProps) => {

  return (
    <div 
      className={styles.checkbox}
      title="Me connecter automatiquement à ma prochaine visite"
      aria-label="Me connecter automatiquement à ma prochaine visite"
    >
      <input
        className={styles.checkbox__input}
        type='checkbox'
        id='remember-me'
        onChange={() => setRememberMe(!rememberMe)}
      />

      <label
        className={styles.checkbox__label}
        htmlFor='remember-me'
      >
        Se souvenir de moi
      </label>
    </div>
  );
};

export default RememberMe;