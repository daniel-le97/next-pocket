import React, { useEffect, useState } from "react";

import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

import { observer } from "mobx-react-lite";


import { pb } from "../../utils/pocketBase";
import ChannelSelection from "./Channels/ChannelSelection";
// const topics = ["general", "tailwind-css", "react"];

const ServerMembersBar = () => {
;

  return (
    <div className="server-members-bar ">
      <ChannelBlock />
      <div className="channel-container">
      
      </div>
    </div>
  );
};

// @ts-ignore
const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="dropdown">
      <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
        <ChevronIcon expanded={expanded} />
        <h5
          className={
            expanded ? "dropdown-header-text-selected" : "dropdown-header-text"
          }
        >
          {header}
        </h5>
        <FaPlus
          size="12"
          className="text-accent my-auto ml-auto text-opacity-80"
        />
      </div>
      {expanded &&
        selections &&
        // @ts-ignore
        selections.map((selection) => (
          <ChannelSelection selection={selection} key={selection} />
        ))}

      <div className="mt-10"></div>
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

// @ts-ignore

const ChannelBlock = () => (
  <div className="channel-block">
    <h5 className="channel-block-text">Channels</h5>
  </div>
);

export default observer(ServerMembersBar);