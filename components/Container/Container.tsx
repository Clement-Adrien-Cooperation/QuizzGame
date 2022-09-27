import type { FunctionComponent, PropsWithChildren } from "react";
import type { User } from "@prisma/client";
import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';
import Notifications from "../Notifications/Notifications";

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

      {isLogged &&
        <Notifications
          userLogged={userLogged}
        />
      }

      {children}
    </>
  );
};

export default Container;