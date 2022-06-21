import Head from "../Header";
import Navbar from '../Navbar';
import Theme from '../Theme';

const Container = (props: any) => {

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