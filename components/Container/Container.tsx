import type { Dispatch, FunctionComponent, PropsWithChildren, SetStateAction } from "react";
import type { Notification, User } from "@prisma/client";
import Head from "../Head/Head";
import Navbar from '../Navbar/Navbar';
import Notifications from "../Notifications/Notifications";
import Background from "../Background/Background";

type Props = PropsWithChildren<{
  isLogged: boolean,
  userLogged: User,
  handleDisconnect: () => void,
  notifications: Notification[],
  nbOfNotifications: number,
  pageTitle: string,
  setNbOfNotifications: Dispatch<SetStateAction<number>>
}>;

const Container: FunctionComponent<Props> = ({
  isLogged,
  userLogged,
  handleDisconnect,
  notifications,
  nbOfNotifications,
  setNbOfNotifications,
  pageTitle,
  children
}) => {

  return (
    <>
      <Head 
        pageTitle={pageTitle}
      />

      <Background />

      <Navbar
        isLogged={isLogged}
        userLogged={userLogged}
        handleDisconnect={handleDisconnect}
      />

      {isLogged &&
        <Notifications
          userLogged={userLogged}
          notifications={notifications}
          nbOfNotifications={nbOfNotifications}
          setNbOfNotifications={setNbOfNotifications}
        />
      }

      {children}
    </>
  );
};

export default Container;