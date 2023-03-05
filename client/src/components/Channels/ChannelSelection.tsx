/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { observer } from "mobx-react-lite";
import { useState, useEffect } from "react";
import { BsHash } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { ChannelsResponse } from "../../../pocketbase-types";
import { pb } from "../../../utils/pocketBase";
import { channelsService } from "../../services/ChannelsService";
import { messageService } from "../../services/MessageService";
const ChannelSelection = ({ selection }: { selection: ChannelsResponse }) => {
  const user = pb.authStore.model;
  const channelTitle: string | undefined = AppState.activeChannel?.title;
  const joinChannel = async () => {
    try {
      const user = pb.authStore.model;
      if (!user) {
        console.error("must be logged in");
        return;
      }

      const data = {
        memberId: user?.id,
        channelId: selection?.id,
      };
      await channelsService.joinChannel(data);
      await messageService.getMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dropdown-selection " onClick={joinChannel}>
      <BsHash size="24" className="text-gray-400" />
      <h5
        className={
          selection.title ===  channelTitle
            ? " dropdown-selection-text text-pink-700 dark:text-green-400"
            : " dropdown-selection-text text-gray-500"
        }
      >
        {selection.title}
      </h5>
      {selection.title === channelTitle ? (
        <img
          src={user?.avatarUrl}
          alt="UserIcon"
          width={15}
          className="rounded-full  shadow-md"
        />
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};
export default observer(ChannelSelection);
