/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { Transition } from "@headlessui/react";
import { Tooltip } from "@nextui-org/react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppState } from "../../../AppState";
import { Server } from "../../../PocketBaseTypes";
import type {
  FileUploadsResponse,
  ServersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
// import { useUser } from "../../../utils/pocketBase";
import { membersService } from "../../services/MembersService";
import CreateServer from "./CreateServer";

const ServerSelection = () => {
  
  const user = AppState.user;
  const router = useRouter();
  const servers = AppState.userServers;

  useEffect(() => {
    // setServers(AppState.userServers);
    if (router.query.id && servers) {
    const server = servers.find((s) => s.id == router.query.id);
      AppState.activeServer = server 
      AppState.messages = [];
    }
  }, [servers, router.query.id]);

  return (
    <>
      {servers &&
        servers.map((s, index) => <ServerIcon server={s} key={index} />)}
    </>
  );
};

const ServerIcon = ({
  server,
}: {
  server: Server
}) => {
  const router = useRouter();
  const activeServer = AppState.activeServer;
  const [isShowing, setShowing] = useState(false);
  const handleClick = async() => {
    AppState.activeServer = server;
    const defaultServer = server.channels[0];
    console.log(`/server/${server.id}/channel/${defaultServer!.id}`);

    await router.push(`/server/${server.id}/channel/${defaultServer!.id}`);
  };
  useEffect(() => {
    setShowing(!isShowing);
  }, []);
  return (
    <Transition
      show={isShowing}
      enter="transition-all duration-700"
      enterFrom="opacity-0 -translate-x-10"
      enterTo="opacity-100 translate-x-0"
      leave="transition-all duration-700"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 -translate-x-10"
    >
      <div className=" sidebar-icon group   ">
        <Tooltip color="invert" content={server.name} placement="right">
          <img
            src={server.image?.url}
            alt="UserIcon"
            className={
              activeServer?.id !== server.id
                ? "server-icon-image"
                : "active-server-icon-image"
            }
            onClick={handleClick}
          />
        </Tooltip>

        {activeServer?.id !== server.id ? (
          <span className="server-icon-bubble group-hover:h-7"></span>
        ) : (
          <span className="active-server-icon-bubble"></span>
        )}
      </div>
    </Transition>
  );
};

export default observer(ServerSelection);
