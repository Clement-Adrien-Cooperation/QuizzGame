import { useState } from 'react';
import InputField from '../InputField/InputField';
import User from '../User/User';
import styles from './Users.module.scss';

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

type UsersProps = {
  users: UserTypes[],
  handleBanishement: Function,
  handlePromotion: Function,
  userLogged: UserLoggedTypes
};

const Users = ({
  users,
  handleBanishement,
  handlePromotion,
  userLogged
} : UsersProps ) => {

  const [usersFilter, setUsersFilter] = useState<string>('');

  const handleChangeFilter = (e:React.ChangeEvent<HTMLInputElement>) => {
    setUsersFilter(e.target.value);
  };

  return (
    <>
      {users.length === 0 ? '' :

        <section className={styles.container}>

          <h3 className={styles.title}>
            {users === [] ? '' : 'Utilisateurs actifs'}
          </h3>

          <div className={styles.input}>
            <InputField
              name={'Filtrer les utilisateurs'}
              state={usersFilter}
              inputID={'users-filter'}
              type={'text'}
              isDisabled={false}
              required={false}
              handleFunction={handleChangeFilter}
            />
          </div>
          
          <ul>
            {users?.map(({id, pseudo, email, avatar, is_admin, is_banished}: UserTypes) => {

              const filteredPseudo = pseudo.toLowerCase();
              const filteredEmail = email.toLowerCase();
              const filter = usersFilter.toLocaleLowerCase();

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

export default Users;