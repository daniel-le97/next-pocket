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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   const handleEscape = (event) => {
  //     if (event.key === "Escape") {
  //       setIsOpen(false);
  //     }
  //   };

  //   if (isOpen) {
  //     window.addEventListener("mousedown", handleClickOutside);
  //     window.addEventListener("keydown", handleEscape);
  //   } else {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //     window.removeEventListener("keydown", handleEscape);
  //   }

  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //     window.removeEventListener("keydown", handleEscape);
  //   };
  // }, [isOpen]);

  return (
    <div className="relative ">
      <button className="server-options-btn" onClick={() => setIsOpen(!isOpen)}>
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
              <LeaveServer />
              <DeleteServer />
              <ShareLink />
              <CreateChannel />
              <SearchMembers />
              <ServerGuidelines />
            </div>
          </div>
        </Transition>
      )}
    </div>
  );
};

//  ANCHOR this is where we need to do our autth checks

export default observer(ServerOptionsMenu);
