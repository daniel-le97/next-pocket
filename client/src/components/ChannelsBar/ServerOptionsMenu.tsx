import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import LeaveServer from "./ServerOptions/LeaveServer";
import DeleteServer from "./ServerOptions/DeleteServer";
import CreateChannel from "./ServerOptions/CreateChannel";
import ShareLink from "./ServerOptions/ShareLink";
import SearchMembers from "./ServerOptions/SearchMembers";
import { useState, useRef, useEffect, Fragment } from "react";
import ServerGuidelines from "./ServerOptions/ServerGuidelines";
import { Transition } from "@headlessui/react";
import { withMember } from "@/middleware";
import { FaArrowDown, FaArrowUp, FaDropbox } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";

const ServerOptionsParent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ServerOptionsMenu isOpen={isOpen} toggleOpen={toggleOpen} />
      <ServerOptions isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
};

const ServerOptionsMenu = ({ isOpen, toggleOpen }) => {
  const handleClick = () => {
    toggleOpen();
  };

  return (
    <div className="relative ">
      <button className="server-options-btn py-[19px]" onClick={handleClick}>
        {AppState.activeServer?.name}
        {isOpen ? <FaArrowUp /> : <FaArrowDown />}
      </button>
      {/* {isOpen && <ServerOptions />} */}
    </div>
  );
};

const ServerOptions = ({ isOpen, toggleOpen }) => {
  const isServerOwner = AppState.activeServer?.owner === AppState.user?.id;

 

  return (
    <div className={`server-options ${isOpen ? "visible" : "hidden"}`}>
      <div className="server-options-container">
        <LeaveServer toggleOpen={toggleOpen} />
        {isServerOwner && (
          <>
            <DeleteServer toggleOpen={toggleOpen} />
            <CreateChannel toggleOpen={toggleOpen} />
          </>
        )}
        <ShareLink  />
        {/* <SearchMembers  /> */}
        <ServerGuidelines toggleOpen={toggleOpen} />
      </div>
    </div>
  );
};



export default observer(withMember(ServerOptionsParent));
