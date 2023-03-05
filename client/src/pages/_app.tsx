/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useEffect } from 'react'
import { useUser } from "../../hooks/User";
import { pb } from "../../utils/pocketBase";
// import { pb } from "../../utils/pocketBase";
import Layout from "../components/Layout";
import { serversService } from "../services/ServersService";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {

  const user = useUser()
  useEffect(() => {
    if (user) {
      const userServers = async() => {
        const servers = await serversService.getUserServers(user.id)
        console.log(servers)
        return servers
      }
      userServers()
    }
  }, [user])

    useEffect(() => {
      const user = pb.authStore.model;
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
          console.log(updatedRecord);
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
  )
};

export default MyApp;
