import { Popover } from "@headlessui/react";

import { observer } from "mobx-react";
import { FaArrowDown, FaClipboard, FaUserMinus } from "react-icons/fa";

import { AppState } from "../../../AppState";

import LeaveServer from "../ServerOptions/LeaveServer";
import DeleteServer from "../ServerOptions/DeleteServer";
import ServerLink from "../ServerOptions/ServerLink";
const ServerSettingsMenu = () => {
  return (
    <Popover className="relative border-b-2 border-b-zinc-900 bg-zinc-800">
      <Popover.Button className="flex w-full items-center justify-between p-2 text-xl font-bold text-white">
        Solutions
        <FaArrowDown size={15} />
      </Popover.Button>

      <Popover.Panel className=" duration-00 absolute top-12 z-10 flex w-full flex-col items-start justify-center rounded-lg bg-zinc-900 p-2 text-white transition-all ease-linear ">
        <LeaveServer server={AppState.activeServer} />
        <DeleteServer />
        <ServerLink />
      </Popover.Panel>
    </Popover>
  );
};

export default observer(ServerSettingsMenu);
