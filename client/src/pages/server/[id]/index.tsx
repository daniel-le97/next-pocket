/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";
import ChannelsBar from "@/components/ChannelsBar/ChannelsBar";
import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";

import Pop from "utils/Pop";
import ServerMembersBar from "@/components/MembersBar/ServerMembersBar";
import { AppState } from "AppState";
import { setRedirect } from "utils/Redirect";
import { channelsService, messageService, serversService } from "@/services";
import { withAuth, withMember } from "@/middleware";

import TopNavigation from "@/components/Messages/TopNavigation";
import MessageScroll from "@/components/Messages/MessageScroll";
import CreateMessage from "@/components/CreateMessage/CreateMessage";
import { Transition } from "@headlessui/react";

const Server: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const fetchServerData = async (id: string) => {
    try {
      AppState.messages = [];
      AppState.messageLikes = [[]];
      await channelsService.getChannelsByServerId(id);
      await messageService.getMessagesByChannelId(AppState.activeChannel!.id);
      await serversService.getMembers(id);
    } catch (error) {
      Pop.error(error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchServerData(id);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex  h-screen w-full  ">
          <ChannelsBar />
          <div className=" message-container ">
            <TopNavigation />

            <MessageScroll />
            <CreateMessage />
          </div>
          <ServerMembersBar />
        </div>
      </main>
    </>
  );
};

export default observer(withAuth(withMember(Server)));
