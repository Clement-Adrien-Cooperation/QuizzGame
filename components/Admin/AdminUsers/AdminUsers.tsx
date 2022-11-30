import type { FunctionComponent } from 'react';
import type { User } from '@prisma/client';
import { useState } from 'react';
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

  const [usersFilter, setUsersFilter] = useState<string>('');

  return (
    <section className={styles.container}>

      <h2 className={styles.title}>
        Utilisateurs actifs
      </h2>

      {users.length > 10 &&
        <div className={styles.input}>
          <InputField
            name={'Rechercher un utilisateur'}
            state={usersFilter}
            inputID={'users-filter'}
            type={'text'}
            isDisabled={false}
            required={true}
            autoFocus={true}
            setState={setUsersFilter}
          />
        </div>
      }

      <ul>
        {users.map((user: User) => {

          const filteredPseudo = user.pseudo.toLowerCase();
          const filteredEmail = user.email.toLowerCase();
          const filter = usersFilter.toLocaleLowerCase();

          if(filteredPseudo.includes(filter) || filteredEmail.includes(filter)) {
            return (
              <li key={uuidv4()}>
                <UserCard
                  user={user}
                  userLogged={userLogged}
                  handleBanishment={handleBanishment}
                  handlePromotion={handlePromotion}
                  handleDeleteUser={handleDeleteUser}
                />
              </li>
            );
          };
        })}
      </ul>
    </section>
  );
};

export default AdminUsers;