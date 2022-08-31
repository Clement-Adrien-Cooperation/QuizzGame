import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';

type UserTypes = {
  id: string,
  pseudo: string,
  email: string,
  password: string,
  avatar: string,
  is_admin: boolean,
  is_banished: boolean
};

type ContainerPropsType = {
  children: JSX.Element,
  isLogged: boolean,
  userLogged: UserTypes
  handleDisconnect: Function
};

const Container = (props: ContainerPropsType) => {

  return (
    <>
      <Head />
      <Navbar
        isLogged={props.isLogged}
        userLogged={props.userLogged}
        handleDisconnect={props.handleDisconnect}
      />
      {props.children}
    </>
  );
};

export default Container;