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
import { AppState } from "../../../AppState";
import { UsersResponse } from "../../../PocketBaseTypes/pocketbase-types";
import ServerSettingsMenu from "./ServerOptionsMenu";
import UserAvatar from "../GlobalComponents/UserAvatar";

const topics = ["general", "tailwind-css", "react"];

const ChannelsBar = () => {
  const channels = AppState.channels;
  const user = AppState.user;
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="channel-bar">
      <div>
        <ServerSettingsMenu />

        <div className="channel-container">
          <div className="m-0 w-full px-2 pb-2 transition duration-300 ease-in-out">
            <div
              onClick={() => setExpanded(!expanded)}
              className="mx-0 flex cursor-pointer flex-row items-center  text-gray-500"
            >
              <ChevronIcon expanded={expanded} />
              <h5
                className={
                  expanded
                    ? "text-lg font-bold text-indigo-500 text-opacity-90"
                    : "text-gray-500text-opacity-90  cursor-default  text-lg font-semibold"
                }
              >
                Text Channels
              </h5>
              {/* <FaPlus
                size="12"
                className="text-accent my-auto ml-auto text-opacity-80"
              /> */}
            </div>
            {expanded &&
              channels &&
              // @ts-ignore
              channels.map((c) => (
                <ChannelSelection selection={c} key={c.id} />
              ))}
          </div>
        </div>
      </div>
      <UserIcon user={user} />
    </div>
  );
};

// @ts-ignore
const ChevronIcon = ({ expanded }) => {
  return expanded ? (
    <FaChevronDown size="14" className="chevron-icon " />
  ) : (
    <FaChevronRight size="14" className="chevron-icon" />
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
      className="user-bar group "
      // onClick={handleClick}
    >
      <div className=" user-bar-container">
        <UserAvatar avatarUrl={user.avatarUrl} height="w-9" width="h-9" />

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
