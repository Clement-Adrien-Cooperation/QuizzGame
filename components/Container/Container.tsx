import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';

type PropsType = {
  children: JSX.Element,
};

const Container = (props: PropsType) => {

  return (
    <>
      <Head />
      <Navbar />
      {props.children}
    </>
  );
};

export default Container;