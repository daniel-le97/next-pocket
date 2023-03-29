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

const ServerOptionsMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
const isServerOwner = AppState.activeServer?.owner === AppState.user?.id;
const isMember = AppState.activeServer?.members.find(a => a === AppState.user?.id)


  return (
    <div className="relative ">
      <button
        className="server-options-btn py-[17px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {AppState.activeServer?.name}
      </button>

      {isOpen && (
        <Transition
          show={isOpen}
          as={Fragment}
          enter="transition-opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div ref={dropdownRef} className="  server-options ">
            <div className="server-options-container">
              {isMember && (
                <>
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
                </>
              )}
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
};

//  ANCHOR this is where we need to do our autth checks
//check if they are a member of the server and if they are the owner
// if they are the owner, show the delete server option
// if they are a member, show the leave server option

export default observer(ServerOptionsMenu);
