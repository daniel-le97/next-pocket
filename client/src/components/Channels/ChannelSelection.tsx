/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { observer } from "mobx-react-lite";
import { useState,useEffect } from "react";
import { BsHash } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { ChannelsResponse } from "../../../pocketbase-types";
import { pb } from "../../../utils/pocketBase";
import { channelsService } from "../../services/ChannelsService";
import { messageService } from "../../services/MessageService";
const ChannelSelection = ({ selection }:{selection:ChannelsResponse}) => {
  // const [activeSelection, setActiveSelection] = useState("");
  const user = pb.authStore.model;
  const channels = AppState.channels
  // const handleClick = async () => {
  //   try {
  //     const room = await pb
  //       .collection("rooms")
  //       .getFirstListItem(`title="${selection}"`, {
  //         expand: "messages",
  //       });

  //     AppState.activeRoom = room;

  //     await messageService.getMessages();
  //     setActiveSelection(selection);
  //     console.log(selection === AppState.activeRoom.title);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  useEffect(()=>{
// console.log(selection);

  },[])

  const joinChannel = async () => {
    try {
      const user = pb.authStore.model;
      if(!user){
        console.error('must be logged in')
        return
      }
      // console.log(user);
      // const channel = AppState.channels.find(c=> c.id == selection.id)
      const data  = {
        memberId: user?.id,
        channelId:selection?.id
      };
      await channelsService.joinChannel(data);
      await messageService.getMessages();
      // setActiveSelection(selection);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dropdown-selection " onClick={joinChannel}>
      <BsHash size="24" className="text-gray-400" />
      <h5
        className={
          selection === AppState?.activeChannel?.title
            ? " dropdown-selection-text text-pink-700 dark:text-green-400"
            : " dropdown-selection-text text-gray-500"
        }
      >
        {selection.title}
      </h5>
      {selection.title == AppState?.activeChannel?.title ? (
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
