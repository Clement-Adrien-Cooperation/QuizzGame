import Head from "../Head";
import Navbar from '../Navbar';
import Theme from '../Theme';

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