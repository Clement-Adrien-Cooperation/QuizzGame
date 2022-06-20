import Navbar from '../Navbar';
import Head from "../Header";

const Container = (props: any) => {

  return (
    <>
      <Head />
      <Navbar />
      {props.children}
    </>
  );
};

export default Container;