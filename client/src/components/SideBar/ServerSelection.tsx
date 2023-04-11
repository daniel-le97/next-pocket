/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { Transition } from "@headlessui/react";
import { Tooltip } from "@nextui-org/react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppState } from "../../../AppState";
import type {
  FileUploadsResponse,
  ServersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import { useUser } from "../../../utils/pocketBase";
import { membersService } from "../../services/MembersService";
import CreateServer from "./CreateServer";

const ServerSelection = () => {
  const [servers, setServers] = useState<
    ServersResponse<FileUploadsResponse<unknown>>[]
  >([]);
  const user = AppState.user;
  const router = useRouter();

  useEffect(() => {
    // setServers(AppState.userServers);
    if (router.query.id && servers) {
      let server = AppState.userServers.find((s) => s?.id == router.query.id);
      AppState.activeServer = server;
      AppState.messages = [];
    }
  }, [AppState.userServers, router.query.id]);

  return (
    <>
      {AppState.userServers &&
        AppState.userServers.map((s, index) => <ServerIcon server={s} key={index} />)}
    </>
  );
};

const ServerIcon = ({
  server,
}: {
  server: ServersResponse<FileUploadsResponse<unknown>>;
}) => {
  const router = useRouter();
  const activeServer = AppState.activeServer;
  const [isShowing, setShowing] = useState(false);
  const handleClick = () => {
    AppState.activeServer = server;

    router.push(`/server/${server.id}`);
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
            src={server?.expand?.image?.url}
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
