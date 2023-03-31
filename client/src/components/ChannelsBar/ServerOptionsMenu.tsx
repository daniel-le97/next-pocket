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

const ServerOptionsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <div className="relative ">
      <Tooltip
        trigger="click"
        content={<ServerOptions />}
        placement="bottom"
        css={{
          backgroundColor: "#18181b",
         shadow: "0 0 0 0px #2f3136, 0 8px 20px rgba(0, 0, 0, 0.3)",
        }}
        hideArrow={true}
      >
        <button
          className="server-options-btn py-[17px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          {AppState.activeServer?.name}
          {isOpen ? <FaArrowUp /> : <FaArrowDown />}
        </button>
      </Tooltip>

      {/* {isOpen && (
      
      )} */}
    </div>
  );
};

const  ServerOptions = () =>{
  
  const isServerOwner = AppState.activeServer?.owner === AppState.user?.id;

  return (
  <div  className="  server-options ">
            <div className="server-options-container">
           
                
                  <LeaveServer />
                  {isServerOwner && (
                    <>
                      <DeleteServer />
                      <CreateChannel />
                    </>
                  )}
                  <ShareLink />
                  <SearchMembers />
                  <ServerGuidelines />
           
            </div>
          </div>
  )
}

//  ANCHOR this is where we need to do our autth checks
//check if they are a member of the server and if they are the owner
// if they are the owner, show the delete server option
// if they are a member, show the leave server option

export default observer(withMember(ServerOptionsMenu));
