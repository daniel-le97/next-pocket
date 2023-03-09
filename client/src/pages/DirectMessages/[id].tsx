/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import SideBar from "../../components/SideBar/SideBar";
import ChannelsBar from "../../components/Channels/ChannelsBar";
import ContentContainer from "../../components/Messages/MessageContainer";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { AppState } from "../../../AppState";
import { authsService } from "../../services/AuthsService";
import { pb } from "../../../utils/pocketBase";
import ServerMembersBar from "../../components/MembersBar/ServerMembersBar";
import { serversService } from "../../services/ServersService";
import { channelsService } from "../../services/ChannelsService";
import { ServersResponse } from "../../../PocketBaseTypes/pocketbase-types";
const Server: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  // const server= AppState.activeServer
  // console.log(router.query)
  const server: ServersResponse | null = AppState.activeServer;
  const user = pb.authStore.model;
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    if (!server) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const getServerChannels = async () => {
      await channelsService.getChannelsByServerId(id?.toString());
      AppState.messages = [];
    };
    // getServerChannels();
  }, []);

  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex  w-full ">
          {/* <SideBar /> */}
          <ChannelsBar />
          <ContentContainer />
          <ServerMembersBar />
        </div>
      </main>
    </>
  );
};

export default Server;
