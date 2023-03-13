/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useEffect } from "react";
import { AppState } from "../../AppState";
import { useUser } from "../../hooks/User";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
// import { pb } from "../../utils/pocketBase";
import Layout from "../components/Layout";
import { membersService } from "../services/MembersService";
import { userService } from "../services/UserService";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const user = pb.authStore.model;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await userService.getUsersList();
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchUsers();

    const fetchUserServers = async () => {
      const userId = user?.id as string;
      const servers = await membersService.getUserServers(userId);
      return servers;
    };
    fetchUserServers();
  }, []);

  useEffect(() => {
    const subscribe = async () => {
      const userStatus = await pb
        .collection("usersStatus")
        .getFirstListItem(`userId = "${user?.id}"`);
      // console.log(userStatus);
      if (!userStatus) {
        throw new Error("userStatus Not Found");
      }

      //     // Update isOnline status to true on component mount
      const data = {
        userId: user?.id,
        isOnline: true,
      };
      const updatedRecord = await pb
        .collection("usersStatus")
        .update(userStatus.id, data);
      // console.log(updatedRecord);

      // Update isOnline status to false on beforeunload event
      const handleBeforeUnload = () => {
        const data = {
          userId: user?.id,
          isOnline: false,
        };
        const updatedRecord = pb
          .collection("usersStatus")
          .update(userStatus.id, data);
        // console.log(updatedRecord);
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Remove the event listener on unmount
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    };
    subscribe();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default observer(MyApp);
