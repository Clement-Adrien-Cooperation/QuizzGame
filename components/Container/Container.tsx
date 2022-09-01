import { FunctionComponent, PropsWithChildren } from "react";
import { User } from "@prisma/client";
import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';

type Props = PropsWithChildren<{
  isLogged: boolean,
  userLogged: User,
  handleDisconnect: () => void
}>;

const Container: FunctionComponent<Props> = ({
  isLogged,
  userLogged,
  handleDisconnect,
  children
}) => {

  return (
    <>
      <Head />
      <Navbar
        isLogged={isLogged}
        userLogged={userLogged}
        handleDisconnect={handleDisconnect}
      />
      {children}
    </>
  );
};

export default Container;