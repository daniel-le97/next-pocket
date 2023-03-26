import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import LeaveServer from "../ServerOptions/LeaveServer";
import DeleteServer from "../ServerOptions/DeleteServer";
import CreateChannel from "../ServerOptions/CreateChannel";
import ShareLink from "../ServerOptions/ShareLink";
import SearchMembers from "../ServerOptions/SearchMembers";
import { useState, useRef, useEffect } from "react";
import ServerGuidelines from "../ServerOptions/ServerGuidelines";

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
      <button
        className="text-md flex w-full items-center justify-between truncate p-2 py-3.5 font-bold text-white focus:bg-zinc-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {AppState.activeServer?.name}
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="   absolute   z-10  flex w-full flex-col items-start justify-center rounded-lg  p-2 text-white transition-all ease-linear"
        >
          <div className="w-full rounded bg-zinc-900 p-2">
            <LeaveServer />
            <DeleteServer />
            <ShareLink />
            <CreateChannel />
            <SearchMembers />
            <ServerGuidelines />
          </div>
        </div>
      )}
    </div>
  );
};

//  ANCHOR this is where we need to do our autth checks

export default observer(ServerOptionsMenu);
