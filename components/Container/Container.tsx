import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';

type PropsType = {
  children: JSX.Element,
  isLogged: boolean
};

const Container = (props: PropsType) => {

  return (
    <>
      <Head />
      <Navbar
        isLogged={props.isLogged}
      />
      {props.children}
    </>
  );
};

export default Container;