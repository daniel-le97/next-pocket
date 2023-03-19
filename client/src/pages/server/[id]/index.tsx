/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";

import ChannelsBar from "../../../components/ChannelsBar/ChannelsBar";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppState } from "../../../../AppState";

import ServerMembersBar from "../../../components/MembersBar/ServerMembersBar";
// import { channelsService } from "../../../services/ChannelsService";
// import type { ServersResponse } from "../../../../PocketBaseTypes/pocketbase-types";


import { observer } from "mobx-react";

import MessagesContainer from "../../../components/Messages/MessageContainer";

import { withAuth } from "../../../middleware/WithAuth";
import { withMember } from "../../../middleware/WithMember";
import { channelsService } from "../../../services/ChannelsService";
import { messageService } from "../../../services/MessageService";
import { serversService } from "../../../services/ServersService";
import { setRedirect } from "../../../../utils/Redirect";
import Pop from "../../../../utils/Pop";


const Server: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  // const server = AppState.activeServer;
  const user = AppState.user
  // console.log('went')

  useEffect(() => {
    if (router.query.id) {
      // const channelId = "ckxz8lx9amoq8aq";
      // console.log((channelId));
      
      // messageService.getMessagesByChannelId(channelId)
      if (user) {
        fetchServerData(id);
        return
      }
      setRedirect(`/server/${id}`)
      router.push('/login')
    }
  }, [router.query.id]);

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

async function fetchServerData(id: string) {
  try {
    await channelsService.getChannelsByServerId(id);
    // await messageService.getMessages();
     const channelId =  AppState.activeChannel?.id
     await messageService.getMessagesByChannelId(channelId)
    await serversService.getMembers(id);
  } catch (error) {
    Pop.error(error);
  }
}

export default observer(withAuth(withMember(Server)));
