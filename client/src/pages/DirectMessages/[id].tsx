/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { type NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { AppState } from "AppState";
import { observer } from "mobx-react";
import Pop from "utils/Pop";
import FriendsBar from "@/components/DirectMessages/FriendsBar";

import { withAuth } from "../../middleware";
import { directMessageService, friendsService } from "../../services";
import DirectMessageScroll from "@/components/DirectMessages/DirectMessageScroll";
import CreateDirectMessage from "@/components/DirectMessages/CreateDirectMessage";
import CreateMessage from "@/components/CreateMessage/CreateMessage";


const DirectMessages: NextPage = () => {
  const router = useRouter();
  const id = router.query.id;
  const user = AppState.user;

  // const messages = AppState.directMessages.filter(dm => dm.id == id)

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (id) {
      AppState.dmRouterQuery = router.query.id as string
      const fetchMessages = async () => {
        try {
          // these
          const nID = id as unknown as number;
          if (AppState.dmTracker[nID] == true) return;
          AppState.directMessages = AppState.directMessages.filter(
            (dm) => dm.id != id
          );
          AppState.dmTracker[nID] = true;
          AppState.page = 1;
          await directMessageService.getDirectMessages(id as string);
          await friendsService.getUserFriendsList();
          // console.log(AppState.directMessages[nID]);
          // console.log("all", AppState.directMessages);
        } catch (error) {
          Pop.error(error);
        }
      };
      fetchMessages();
    }
    return () => {
      AppState.dmTracker[id as unknown as number] = false;
    };
  }, [router.query.id]);

  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className="flex  h-screen   w-full ">
          <FriendsBar />
          <div className="message-container">
            {router.query.id && <DirectMessageScroll />}
            {/* <CreateDirectMessage /> */}
            <CreateMessage/>
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(withAuth(DirectMessages));
