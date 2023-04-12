/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { observer } from "mobx-react";
import { type AppType } from "next/dist/shared/lib/utils";
import React, { useEffect } from "react";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import Layout from "../components/Layout";
// import "../styles/tailwind.css";
import "../styles/scss/globals.scss";
import {

  membersService,
  usersService,
  usersStatusService,
} from "../services";
import { useRouter } from "next/router";
import { logger } from "~/utils/Logger";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";

const progress = new ProgressBar({
  size: 2,
  color: "#38a169",
  className: "bar-of-progress",
  delay: 100,
});


Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);










const MyApp: AppType = ({ Component, pageProps }) => {
  const user = AppState.user || pb.authStore.model;
  useEffect(() => {
    console.log('userChanged');
    
    // if you want it to be fetch before anything else put your call here
    (async () => {
      try {
        if (!user) return;
        await membersService.getUserServers(user.id);
        await usersStatusService.setStatusOnline(user.id, 'online');
        usersStatusService.handleListeners(false, user.id)
      } catch (error) {
        Pop.error(error);
      }
    })();
    
    return () => {
      if (user) {
        usersStatusService.handleListeners(true, user.id)
      }
    };
  }, [user]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default observer(MyApp);
