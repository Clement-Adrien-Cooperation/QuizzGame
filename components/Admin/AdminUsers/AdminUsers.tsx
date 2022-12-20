import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputField from '../../InputField/InputField';
import UserCard from '../UserCard/UserCard';
import styles from './AdminUsers.module.scss';

type Props = {
  users: User[],
  userLogged: User,
  handlePromotion: (user_id: string, is_banished: boolean) => void,
  handleBanishment: (user_id: string, is_banished: boolean) => void,
  handleDeleteUser: (user_id: string) => void
};

const AdminUsers: FunctionComponent<Props> = ({
  users,
  userLogged,
  handlePromotion,
  handleBanishment,
  handleDeleteUser
}) => {

  const [filter, setFilter] = useState<string>('');

  const displayedUsers = useMemo(() => {
    if(filter) {
      return users.filter((user: User) => {
        return user.pseudo.toLowerCase().includes(filter.toLowerCase())
        || user.email.toLowerCase().includes(filter.toLowerCase());
      });
    };

    return users;

  }, [filter, users]);

  return (
    <section className={styles.container}>

      <h2 className={styles.title}>
        Utilisateurs actifs
      </h2>

      {users.length > 10 &&
        <div
          className={styles.input}
          title={"Vous pouvez filtrer les utilisateurs avec leur pseudo ou leur email"}
          aria-label={"Vous pouvez filtrer les utilisateurs avec leur pseudo ou leur email"}
        >
          <InputField
            name={'Rechercher un utilisateur'}
            state={filter}
            inputID={'users-filter'}
            type={'text'}
            isDisabled={false}
            required={true}
            autoFocus={true}
            setState={setFilter}
          />
        </div>
      }

      <ul>
        {displayedUsers?.map((user: User) =>
          <li key={uuidv4()}>
            <UserCard
              user={user}
              userLogged={userLogged}
              handleBanishment={handleBanishment}
              handlePromotion={handlePromotion}
              handleDeleteUser={handleDeleteUser}
            />
          </li>
        )}
      </ul>
    </section>
  );
};

export default AdminUsers;