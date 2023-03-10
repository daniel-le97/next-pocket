/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { NextPage } from "next";
import type { Admin, Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../../hooks/User";
import type { ServersResponse } from "../../../PocketBaseTypes/pocketbase-types";

import ContentContainer from "../../components/Messages/MessageContainer";

import Head from "next/head";
import FriendsBar from "../../components/DirectMessages/FriendsBar";
import { userService } from "../../services/UserService";
import Pop from "../../../utils/Pop";
import { AppState } from "../../../AppState";
import AddFriend from "../../components/DirectMessages/AddFriend";
function DirectMessagesPage() {
  const [user, setUser] = useState<Record | Admin | null>();
  const [servers, setServers] = useState<ServersResponse<unknown>>();

  useEffect(() => {
    const getFriendsList = async () => {
      try {
        await userService.getUsersList();
      } catch (error) {
        Pop.error(error);
      }
    };

    //  getFriendsList();

    // setFriends(AppState.users)
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
          <FriendsBar />

          <div className="content-container">
            <div className="content-list">
              <AddFriend/>
            </div>
          </div>
          {/* <ContentContainer /> */}
          {/* <ServerMembersBar /> */}
        </div>
      </main>
    </>
  );
}

export default observer(DirectMessagesPage);
