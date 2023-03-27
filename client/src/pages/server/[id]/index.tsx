/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";
import ChannelsBar from "@/components/ChannelsBar/ChannelsBar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { observer } from "mobx-react";
import MessagesContainer from "@/components/Messages/MessageContainer";


import Pop from "utils/Pop";
import ServerMembersBar from "@/components/MembersBar/ServerMembersBar";
import { AppState } from "AppState";
import { setRedirect } from "utils/Redirect";
import { channelsService, messageService, serversService } from "@/services";
import { withAuth, withMember } from "@/middleware";




import TopNavigation from "@/components/Messages/TopNavigation";
import MessageScroll from "@/components/Messages/MessageScroll";
import CreateMessage from "@/components/Messages/CreateMessage";

const Server: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  // const server = AppState.activeServer;
  const user = AppState.user;
  // console.log('went')
const fetchServerData = async (id: string) => {
  try {
    //
    AppState.page = 1;
    await channelsService.getChannelsByServerId(id);
    const channelId = AppState.activeChannel!.id;
    console.log(channelId);
    await messageService.getMessagesByChannelId(channelId);
    await serversService.getMembers(id);
  } catch (error) {
    Pop.error(error);
  }
};
  useEffect(() => {
    if (!user) {
      setRedirect(`/server/${id}`);
      router.push("/login");
    }
    if (router.query.id) fetchServerData(id);
  }, [router.query.id]);

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
