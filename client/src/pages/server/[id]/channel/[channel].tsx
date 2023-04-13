/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
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
import { NextPage } from "next";
import ProgressBar from "@badrap/bar-of-progress";

interface IProgressBar{
  start(): void;
  finish(): void;
}
const ServerOne: NextPage = () => {
  const router = useRouter();
  const { id, channel } = router.query as { id: string; channel: string };
  // const serverId = router.query.id as string;
  // const channelId = router.query.channel as string;
  useEffect(() => {
    if (!id || !channel) {
      return;
    }

    const fetchServerData = async () => {
      try {
        // AppState.messages = [];
        // AppState.messageLikes = [[]];

        await channelsService.getChannelsByServerId(id);

        // await serversService.getMembers(id);
        // console.log(AppState.messages);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchServerData();
  }, [id]);

  useEffect(() => {
    if (!id || !channel) {
      return;
    }

    
    const fetchChannelData = async () => {
      const progress = new ProgressBar({
        size: 2,
        color: "#4b60dd",
        className: "bar-of-progress",
        delay: 100,
      }) as unknown as IProgressBar;
      try {
        progress.start();
        await channelsService.joinChannel({
          memberId: AppState.user!.id,
          channelId: channel,
        });
        await messageService.getMessagesByChannelId(channel);
        progress.finish();
      } catch (error) {
        progress.finish();
        Pop.error(error);
      }
    };

    fetchChannelData();
  }, [channel]);

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

export default observer(withAuth(withMember(ServerOne)));
