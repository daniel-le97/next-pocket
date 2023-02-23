import React, { useState } from "react";
import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaAirbnb, FaFire, FaHome, FaPoo } from "react-icons/fa";
import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";
import { BsHash } from "react-icons/bs";
import { pb } from "../../utils/pocketBase";
import { AppState } from "../../AppState.js";

const topics = ["general", "tailwind-css", "react"];
const questions = ["jit-compilation", "purge-files", "dark-mode"];
const random = ["variants", "plugins"];

const ChannelsBar = () => {
  return (
    <div className="channel-bar ">
      <ChannelBlock />
      <div className="channel-container">
        <Dropdown header="Topics" selections={topics} />
        {/* <Dropdown header="Questions" selections={questions} />
        <Dropdown header="Random" selections={random} /> */}
      </div>
    </div>
  );
};

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
        selections.map((selection) => (
          <TopicSelection selection={selection} key={selection} />
        ))}
    </div>
  );
};

const ChevronIcon = ({ expanded }) => {
  const chevClass = "text-accent text-opacity-80 my-auto mr-1";
  return expanded ? (
    <FaChevronDown size="14" className={chevClass} />
  ) : (
    <FaChevronRight size="14" className={chevClass} />
  );
};

const TopicSelection = ({ selection }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      // Use pocketbase to get the room by title or ID
      const room = await pb
        .collection("rooms")
        .getFirstListItem(`title="${selection}"`,{
          expand:'nessages'
        });
      // Update AppState.activeRoom
      AppState.activeRoom = room.id;
      console.log(AppState.activeRoom);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dropdown-selection " onClick={handleClick}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <>
          <BsHash size="24" className="text-gray-400" />
          <h5 className="dropdown-selection-text">{selection}</h5>
        </>
      )}
    </div>
  );
};

const ChannelBlock = () => (
  <div className="channel-block">
    <h5 className="channel-block-text">Channels</h5>
  </div>
);

export default ChannelsBar;
