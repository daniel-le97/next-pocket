/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { observer } from "mobx-react";
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useEffect } from "react";
import { AppState} from "../../AppState";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import Layout from "../components/Layout";
import "../styles/tailwind.css"
import "../styles/scss/globals.scss";
import { membersService, usersService, usersStatusService } from "../services";
import { useRouter } from "next/router";





const MyApp: AppType = ({ Component, pageProps }) => {
  const user = AppState.user || pb.authStore.model
  useEffect(() => {
    // if you want it to be fetch before anything else put your call here
    (async () => {
      try {
        if(!user)return
        await membersService.getUserServers(user.id);
        usersStatusService.setStatusOnline(user.id)
      } catch (error) {
        Pop.error(error);
      }
    })();

    return () => {
      if(user) {
        usersStatusService.setStatusOnline(user.id)
        // usersService.setLastChannel()
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
