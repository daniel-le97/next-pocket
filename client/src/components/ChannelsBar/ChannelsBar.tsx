/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";

import {
  FaArrowDown,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";

import { observer } from "mobx-react";

import ChannelSelection from "./ChannelSelection";

import { channelsService } from "../../services/ChannelsService";
import { AppState } from "../../../AppState";
import LeaveServer from "../ServerOptions/LeaveServer";
import { useRouter } from "next/router";
import {
  ChannelsResponse,
  Collections,
  UsersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import { messageService } from "../../services/MessageService";
import ServerLink from "../ServerOptions/ShareLink";
import DeleteServer from "../ServerOptions/DeleteServer";
import { Popover } from "@headlessui/react";
import ServerSettingsMenu from "./ServerOptionsMenu";
import { pb } from "utils/pocketBase";
import { likesService } from "@/services/LikesService";
import CreateServer from "../SideBar/CreateServer";
import MyModal from "../GlobalComponents/Modal";

const topics = ["general", "tailwind-css", "react"];

const ChannelsBar = () => {
  const channels = AppState.channels;
  const server = AppState.activeServer;
  const router = useRouter();
  const user = AppState.user;
  const [expanded, setExpanded] = useState(true);
  // useEffect(() => {
  //   if (router.query.id) {
  //     const id = router.query.id as string;
  //     const getChannels = async () => {
  //       await channelsService.getChannelsByServerId(id);
  //     };
  //     getChannels();

  //     const setActiveChannel = async () => {
  //       try {
  //         const res = await pb
  //           .collection(Collections.Users)
  //           .getOne<ChannelsResponse>(user?.id, {
  //             expand: "currentChannel",
  //           });

  //         if (res.expand.currentChannel) {
  //           AppState.activeChannel = res.expand.currentChannel;
  //           // await messageService.getMessages();
  //         }
  //       } catch (error) {}
  //     };
  //     setActiveChannel();
  //   }
  // }, [router.query.id]);

  return (
    <div className="channel-bar">
      <div>
        <ServerSettingsMenu />

        <div className="channel-container">
          <div className="m-0 w-full px-2 pb-2 transition duration-300 ease-in-out">
            <div
              onClick={() => setExpanded(!expanded)}
              className="mx-0 flex cursor-pointer flex-row items-center justify-evenly text-gray-500"
            >
              <ChevronIcon expanded={expanded} />
              <h5
                className={
                  expanded
                    ? "text-lg font-bold text-blue-500 text-opacity-90"
                    : "text-gray-500text-opacity-90  cursor-default  text-lg font-semibold"
                }
              >
                Text Channels
              </h5>
              <FaPlus
                size="12"
                className="text-accent my-auto ml-auto text-opacity-80"
              />
            </div>
            {expanded &&
              channels &&
              // @ts-ignore
              channels.map((c) => (
                <ChannelSelection selection={c} key={c.id} />
              ))}

            {/* <div className="fixed bottom-0 mb-3 flex flex-col gap-3">
            {server && <LeaveServer server={AppState.activeServer} />}
            <ServerLink/>
            <DeleteServer/>

          </div> */}
          </div>
        </div>
      </div>
      <UserIcon user={user} />
    </div>
  );
};

// @ts-ignore
const ChevronIcon = ({ expanded }) => {
  const chevClass = "text-accent text-opacity-80 my-auto mr-1";
  return expanded ? (
    <FaChevronDown size="14" className={chevClass} />
  ) : (
    <FaChevronRight size="14" className={chevClass} />
  );
};

export const UserIcon = ({ user }: { user: UsersResponse }) => {
  const [isHovered, setHovered] = useState(false);
  const handleClick = () => {
    setHovered(!isHovered);
  };
  return (
    <button
      onBlur={handleClick}
      onFocus={handleClick}
      className="group relative w-full cursor-pointer bg-zinc-900 p-1  "
      // onClick={handleClick}
    >
      <div className=" flex gap-x-2 rounded-md p-1 transition-all ease-linear  hover:bg-zinc-700 ">
        <img
          src={
            // @ts-ignore
            user?.avatarUrl
              ? // @ts-ignore
                user?.avatarUrl
              : `https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.username}`
          }
          alt="UserIcon"
          className="h-9 w-9 rounded-full"
        />
        <div className=" truncate font-semibold  text-white">
          {user?.username}
        </div>
      </div>
      {isHovered && (
        <div className="user-modal  ">
          <div className="user-modal-banner"></div>
          <img
            src={user?.avatarUrl}
            alt="UserIcon"
            width={80}
            className="user-modal-user-image"
          />

          <div className="mt-12 rounded-md bg-zinc-900 p-2 ">
            <p className="text-xl">{user?.username}</p>
            <hr className="my-2  border-gray-600" />
            <div>
              <p className="text-md font-bold ">MEMBER SINCE</p>
              <p className="  font-mono text-gray-400  ">
                {new Date(user.created).toLocaleDateString()}
              </p>
            </div>
            <hr className="my-2  border-gray-600" />
            <div className="">LogOut</div>
          </div>
        </div>
      )}
    </button>
  );
};

export default observer(ChannelsBar);
