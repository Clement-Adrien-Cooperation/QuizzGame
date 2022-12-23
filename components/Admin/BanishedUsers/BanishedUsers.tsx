import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../InputField/InputField';
import UserCard from '../UserCard/UserCard';
import styles from './BanishedUsers.module.scss';

type Props = {
  banishedUsers: User[],
  userLogged: User,
  handlePromotion: (user_id: string, is_admin: boolean, index: number) => void,
  handleBanishment: (user_id: string, is_banished: boolean, index: number) => void,
  handleDeleteUser: (user_id: string, index: number) => void
};

const BanishedUsers: FunctionComponent<Props> = ({ 
  banishedUsers,
  userLogged,
  handlePromotion,
  handleBanishment,
  handleDeleteUser
}) => {

  const [filter, setFilter] = useState<string>('');

  const displayedUsers = useMemo(() => {
    if(filter) {
      return banishedUsers.filter((user: User) => {
        return user.pseudo.toLowerCase().includes(filter.toLowerCase())
        || user.email.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return banishedUsers;

  }, [banishedUsers, filter]);

  return (
    <>
      {banishedUsers.length > 0 &&
        <section className={styles.container}>
          <h2 className={styles.title}>
            Utilisateurs bannis
          </h2>

          {banishedUsers.length > 10 &&
            <div
              className={styles.input}
              title={"Vous pouvez filtrer les utilisateurs avec leur pseudo ou leur email"}
              aria-label={"Vous pouvez filtrer les utilisateurs avec leur pseudo ou leur email"}
            >
              <InputField
                name={'Rechercher un utilisateur'}
                state={filter}
                inputID={'banished-users-filter'}
                type={'search'}
                isDisabled={false}
                required={true}
                autoFocus={false}
                setState={setFilter}
              />
            </div>
          }

          <ul>
            {displayedUsers?.map((user: User, index: number) => 
              <li key={uuidv4()}>
                <UserCard
                  user={user}
                  index={index}
                  userLogged={userLogged}
                  handleBanishment={handleBanishment}
                  handlePromotion={handlePromotion}
                  handleDeleteUser={handleDeleteUser}
                />
              </li>
            )}
          </ul>
        </section>
      }
    </>
  );
};

export default BanishedUsers;