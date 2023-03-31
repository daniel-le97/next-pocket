/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useEffect } from "react";
import { AppState, State } from "../../AppState";
import { useUser } from "../../hooks/User";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";

// import { pb } from "../../utils/pocketBase";
import Layout from "../components/Layout";

import "../styles/tailwind.css"
import "../styles/scss/globals.scss";
import { membersService, usersService } from "../services";
import { usersStatusService } from "@/services/UsersStatusService";
import { useRouter } from "next/router";





const MyApp: AppType = ({ Component, pageProps }) => {
  
  
  
  
  const user = AppState.user || pb.authStore.model
  // console.log(AppState, State);
  const router = useRouter()
  
  useEffect(() => {
    // if you want it to be fetch before anything else put your call here
    (async () => {
      try {
        if(!user)return
        await membersService.getUserServers(user.id);
        usersStatusService.setStatusOnline(user.id)
        // const channel = usersService.getLastChannel()
        const Channel = AppState.user?.expand.currentChannel
        if(Channel) {
          // AppState.activeChannel = Channel
          router.push(`server/${Channel.server}`)
        }
      } catch (error) {
        Pop.error(error);
      }
    })();


    return () => {
      if(user) {
        usersStatusService.setStatusOnline(user.id)
        usersService.setLastChannel()
      }
    } 
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default observer(MyApp);
