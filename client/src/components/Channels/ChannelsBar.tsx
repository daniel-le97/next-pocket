/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";

import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

import { observer } from "mobx-react-lite";

import ChannelSelection from "./ChannelSelection";
import { pb } from "../../../utils/pocketBase";
import { channelsService } from "../../services/ChannelsService";
import { AppState } from "../../../AppState";
import LeaveServer from "./LeaveServer";
const topics = ["general", "tailwind-css", "react"];

const ChannelsBar = () => {
  const channels = AppState.channels;
  const server = AppState.activeServer
  const [expanded, setExpanded] = useState(true);
  useEffect(() => {
    const getChannels = async () => {
      await channelsService.getChannelsByServerId();
    };
    getChannels();
  }, []);

  return (
    <div className="channel-bar ">
      <div className="channel-block">
        <h5 className="channel-block-text">Channels</h5>
      </div>
      <div className="channel-container">
        <div className="dropdown">
          <div
            onClick={() => setExpanded(!expanded)}
            className="dropdown-header"
          >
            <ChevronIcon expanded={expanded} />
            <h5
              className={
                expanded
                  ? "dropdown-header-text-selected"
                  : "dropdown-header-text"
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

          <div className="fixed bottom-0 mb-3">
            <LeaveServer server={server} />
          </div>
        </div>
      </div>
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

export default observer(ChannelsBar);
