import { Popover } from "@headlessui/react";

import { observer } from "mobx-react";
import { AppState } from "../../../AppState";
import LeaveServer from "../ServerOptions/LeaveServer";
import DeleteServer from "../ServerOptions/DeleteServer";
import CreateChannel from "../ServerOptions/CreateChannel";
import InvitePeople from "../ServerOptions/InvitePeople";

const ServerSettingsMenu = () => {
  return (
    <Popover className="relative   shadow-md shadow-zinc-900 ">
      <Popover.Button className="flex w-full    items-center justify-between truncate p-2 py-3.5 text-md font-bold text-white focus:bg-zinc-700     focus:outline-none">
       {AppState.activeServer?.name}
        {/* <FaArrowDown size={15} /> */}
      </Popover.Button>

      <Popover.Panel className=" duration-00 absolute top-12 z-10 flex w-full flex-col items-start justify-center rounded-lg bg-zinc-900 p-2 text-white transition-all ease-linear ">
        <LeaveServer server={AppState.activeServer} />
        <DeleteServer />
        <InvitePeople />
        <CreateChannel/>
      </Popover.Panel>
    </Popover>
  );
};

//  ANCHOR this is where we need to do our autth checks

export default observer(ServerSettingsMenu);
