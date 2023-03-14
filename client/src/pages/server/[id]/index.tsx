/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";

import ChannelsBar from "../../../components/Channels/ChannelsBar";

import React, { useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { AppState } from "../../../../AppState";

import { pb } from "../../../../utils/pocketBase";
import ServerMembersBar from "../../../components/MembersBar/ServerMembersBar";
import { channelsService } from "../../../services/ChannelsService";
import type { ServersResponse } from "../../../../PocketBaseTypes/pocketbase-types";

import { serversService } from "../../../services/ServersService";
import { membersService } from "../../../services/MembersService";
import { observer } from "mobx-react";

import MessagesContainer from "../../../components/Messages/MessageContainer";
import { messageService } from "../../../services/MessageService";
import { Transition } from "@headlessui/react";

const Server: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const server: ServersResponse | null = AppState.activeServer;
  const user = pb.authStore.model;

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    let isMember = false;
    if (router.query.id) {
      const checkIfMember = async () => {
        const member = await membersService.getUserMemberRecord({
          user: user?.id,
          server: id,
        });
        member ? (isMember = true) : router.push("/");
      };
      const getServerChannels = async () => {
        AppState.messages = [];
        await channelsService.getChannelsByServerId(id);
        await messageService.getMessages();
        await serversService.getMembers(id);
      };
      checkIfMember();
      getServerChannels();

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

export default observer(Server);
