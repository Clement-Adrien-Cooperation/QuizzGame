import { useState } from 'react';
import InputField from '../InputField/InputField';
import User from '../User/User';
import styles from './BanishedUsers.module.scss';

type UserTypes = {
  id: number,
  pseudo: string,
  email: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type UserLoggedTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean
};

type BanishedUsersProps = {
  banishedUsers: UserTypes[],
  handleBanishement: Function,
  handlePromotion: Function,
  userLogged: UserLoggedTypes
};

const BanishedUsers = ({ 
  banishedUsers,
  handleBanishement,
  handlePromotion,
  userLogged
} : BanishedUsersProps ) => {

  const [banishedUsersFilter, setBanishedUsersFilter] = useState<string>('');

  const handleChangeFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
    setBanishedUsersFilter(e.target.value);
  };

  return (
    <>
      { banishedUsers.length === 0 ? '' : 
        <section className={styles.container}>
          <h3 className={styles.title}>
            {banishedUsers === [] ? '' : 'Utilisateurs bannis'}
          </h3>

          <div className={styles.input}>
            <InputField
              name={'Rechercher un utilisateur'}
              state={banishedUsersFilter}
              inputID={'banished-users-filter'}
              type={'text'}
              isDisabled={false}
              required={true}
              autoFocus={false}
              handleFunction={handleChangeFilter}
            />
          </div>

          <ul>
            {banishedUsers?.map(({id, pseudo, email, avatar, is_admin, is_banished}: UserTypes) => {

              const filteredPseudo = pseudo.toLowerCase();
              const filteredEmail = email.toLowerCase();
              const filter = banishedUsersFilter.toLocaleLowerCase();

              if(filteredPseudo.includes(filter) || filteredEmail.includes(filter)) {
                return (
                  <li key={id}>
                    <User
                      id={id}
                      pseudo={pseudo}
                      email={email}
                      avatar={avatar}
                      is_admin={is_admin}
                      is_banished={is_banished}
                      handleBanishement={handleBanishement}
                      handlePromotion={handlePromotion}
                      userLogged={userLogged}
                    />
                  </li>
                );
              };
            })}
          </ul>
        </section>
      }
    </>
  );
};

export default BanishedUsers;