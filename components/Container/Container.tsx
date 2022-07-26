import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';

type UserTypes = {
  id: number,
  pseudo: string,
  is_admin: boolean,
  is_banished: boolean,
};

type PropsType = {
  children: JSX.Element,
  isLogged: boolean,
  userLogged: UserTypes,
  setIsLogged: Function,
  setUserLogged: Function
};

const Container = (props: PropsType) => {

  return (
    <>
      <Head />
      <Navbar
        isLogged={props.isLogged}
        userLogged={props.userLogged}
        setIsLogged={props.setIsLogged}
        setUserLogged={props.setUserLogged}
      />
      {props.children}
    </>
  );
};

export default Container;