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
import type {
  ChannelsResponse,
  UsersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import ServerSettingsMenu from "./ServerOptionsMenu";
import UserAvatar from "../GlobalComponents/UserAvatar";
import { Tooltip } from "@nextui-org/react";
import UserProfileBar from "../GlobalComponents/UserProfileBar";

// const topics = ["general", "tailwind-css", "react"];
type ChannelsBarProps = {
  user: UsersResponse;
  channels: ChannelsResponse[];
};
const ChannelsBar = () => {
  const user = AppState.user;
  const channels = AppState.channels;
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="channel-bar">
      <div>
        <ServerSettingsMenu />

        <div className="channel-container">
          <div className="m-0 w-full px-2 pb-2 transition duration-300 ease-in-out">
            <div
              onClick={() => setExpanded(!expanded)}
              className=" mx-0 mt-3 flex cursor-pointer flex-row items-center  text-gray-500"
            >
              <ChevronIcon expanded={expanded} />
              <h5
                className={
                  expanded
                    ? "channel-selection-header-expanded  "
                    : "channel-selection-header "
                }
              >
                Text Channels
              </h5>
            </div>
            {expanded &&
              channels &&
              channels.map((c) => (
                <ChannelSelection selection={c} key={c.id} />
              ))}
          </div>
        </div>
      </div>
      <UserProfileBar user={user as UsersResponse} />
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

export default observer(ChannelsBar);
