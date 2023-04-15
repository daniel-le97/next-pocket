import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import LeaveServer from "./ServerOptions/LeaveServer";
import DeleteServer from "./ServerOptions/DeleteServer";
import CreateChannel from "./ServerOptions/CreateChannel";
import ShareLink from "./ServerOptions/ShareLink";
import { useState,  } from "react";
import ServerGuidelines from "./ServerOptions/ServerGuidelines";
import { withMember } from "@/middleware";
import { FaArrowDown, FaArrowUp, FaDropbox } from "react-icons/fa";


const ServerOptionsParent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative ">
        <button className="server-options-btn py-[19px]" onClick={toggleOpen}>
          {AppState.activeServer?.name}
          {isOpen ? <FaArrowUp /> : <FaArrowDown />}
        </button>
      </div>
      <ServerOptions isOpen={isOpen} toggleOpen={toggleOpen} />
    </>
  );
};

const ServerOptions = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  const isServerOwner = AppState.activeServer?.owner! === AppState.user?.id;

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
        <ShareLink />

        <ServerGuidelines toggleOpen={toggleOpen} />
      </div>
    </div>
  );
};

export default observer(withMember(ServerOptionsParent));
