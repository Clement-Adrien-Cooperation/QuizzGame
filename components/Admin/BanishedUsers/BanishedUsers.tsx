import { User } from '@prisma/client';
import { ChangeEvent, FunctionComponent, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../InputField/InputField';
import UserCard from '../UserCard/UserCard';
import styles from './BanishedUsers.module.scss';

type Props = {
  banishedUsers: User[],
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void
};

const BanishedUsers: FunctionComponent<Props> = ({ 
  banishedUsers,
  userLogged,
  handlePromotion,
  handleBanishment
}) => {

  const [banishedUsersFilter, setBanishedUsersFilter] = useState<string>('');

  const handleChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setBanishedUsersFilter(event.target.value);
  };

  return (
    <>
      {banishedUsers.length < 1 &&
        <section className={styles.container}>
          <h2 className={styles.title}>
            Utilisateurs bannis
          </h2>

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
            {banishedUsers?.map((user: User) => {

              const filteredPseudo = user.pseudo.toLowerCase();
              const filteredEmail = user.email.toLowerCase();
              const filter = banishedUsersFilter.toLocaleLowerCase();

              if(filteredPseudo.includes(filter) || filteredEmail.includes(filter)) {
                return (
                  <li key={uuidv4()}>
                    <UserCard
                      user={user}
                      handleBanishment={handleBanishment}
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