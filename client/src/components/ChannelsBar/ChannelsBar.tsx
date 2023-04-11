/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaClipboard,
  FaCopy,
} from "react-icons/fa";
import { observer } from "mobx-react";
import ChannelSelection from "./ChannelSelection";
import { AppState } from "../../../AppState";
import type { UsersResponse } from "../../../PocketBaseTypes/pocketbase-types";
import ServerSettingsMenu from "./ServerOptionsMenu";
import UserAvatar from "../GlobalComponents/UserAvatar";
import { Tooltip } from "@nextui-org/react";

// const topics = ["general", "tailwind-css", "react"];

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
      <UserIcon user={user as UsersResponse} />
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
  const [showTooltip, setShowTooltip] = useState(false);
  const handleClick = () => {
    setHovered(!isHovered);
  };
  return (
    user && (
      <div className="group">
        <button onFocus={handleClick} className="user-bar group ">
          <div className=" user-bar-container">
            <UserAvatar avatarUrl={user.avatarUrl} height="w-9" width="h-9" />

            <div className=" truncate font-semibold  text-white">
              {user?.username}
            </div>
          </div>
        </button>

        <div className={`user-modal  ${isHovered ? "scale-100" : "scale-0"} `}>
          <div className="user-modal-banner"></div>
          <div className="user-modal-user-image">
            <UserAvatar avatarUrl={user.avatarUrl} height="w-20" width="h-20" />
          </div>
          {/* <img
          src={user?.avatarUrl}
          alt="UserIcon"
          className="user-modal-user-image"
        /> */}

          <div
            className="mx-2 mt-16  rounded-md p-2 "
            style={{
              backgroundColor: "#111214",
            }}
          >
            <p className="p-2 text-xl">{user?.username}</p>
            <hr className="my-2  border-gray-600" />
            <div className="p-2">
              <p className="text-md font-bold ">MEMBER SINCE</p>
              <p className="  font-mono text-gray-400  ">
                {new Date(user.created).toLocaleDateString()}
              </p>
            </div>
            <hr className="my-2  border-gray-600" />

            <div className="">
              <Tooltip
                trigger={showTooltip ? "click" : "hover"}
                content={showTooltip ? "Copied!" : "Copy to Clipboard"}
                color={showTooltip ? "success" : "invert"}
                visible={showTooltip}
              >
                <div
                  className="  text-md group/item flex w-96 cursor-pointer justify-between rounded  p-2  "
                  onClick={(e) => {
                    setShowTooltip(true);
                    setTimeout(() => setShowTooltip(false), 1500);
                    navigator.clipboard.writeText(
                      user.username + "#" + AppState.userStatus?.id
                    );
                  }}
                >
                  {user.username + "#" + AppState.userStatus?.id}
                  <div className="opacity-0 group-hover/item:opacity-100">
                    <FaCopy
                      size={20}
                      className={showTooltip ? "text-green-5  00" : ""}
                    />
                  </div>
                </div>
              </Tooltip>
            </div>
            <div className="">LogOut</div>
          </div>
        </div>
      </div>
    )
  );
};

export default observer(ChannelsBar);
