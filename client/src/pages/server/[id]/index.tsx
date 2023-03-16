/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";

import ChannelsBar from "../../../components/ChannelsBar/ChannelsBar";

import React, { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { AppState } from "../../../../AppState";

import { pb } from "../../../../utils/pocketBase";
import ServerMembersBar from "../../../components/MembersBar/ServerMembersBar";
// import { channelsService } from "../../../services/ChannelsService";
// import type { ServersResponse } from "../../../../PocketBaseTypes/pocketbase-types";


import { observer } from "mobx-react";

import MessagesContainer from "../../../components/Messages/MessageContainer";

import { withAuth } from "../../../middleware/WithAuth";
import { withMember } from "../../../middleware/WithMember";

const Server: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const server = AppState.activeServer;
  const user = pb.authStore.model;
  // console.log('went')

  // useEffect(() => {
  //   if (router.query.id) {
  //     const fetchServerData = async () => {
  //       try {
  //         if (!user) {
  //           setRedirect({ pathname: "/server/[id]", query: { id } });
  //           return router.push("/login");
  //         }
  //         console.log(router.asPath);
  //         await channelsService.getChannelsByServerId(id);
  //         await messageService.getMessages();
  //         await serversService.getMembers(id);
  //       } catch (error) {
  //         Pop.error(error);
  //       }
  //     };
  //     fetchServerData();
  //   }
  // }, [router.query.id]);

  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex  w-full  ">
          <ChannelsBar />
          <MessagesContainer />
          <ServerMembersBar />
        </div>
      </main>
    </>
  );
};

export default observer(withAuth(withMember(Server)));
