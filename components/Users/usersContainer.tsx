import UsersView from './usersView';

interface user {
  id: number,
  pseudo: string,
  email: string,
  password: string,
  avatar?: string | null,
  is_admin: boolean,
  is_banished: boolean
};

const UsersContainer = () => {

  return (
    <UsersView />
  );
};

export default UsersContainer;