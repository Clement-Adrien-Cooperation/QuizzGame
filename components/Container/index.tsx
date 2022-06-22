import Head from "../Header";
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
      <Theme />
      {props.children}
    </>
  );
};

export default Container;