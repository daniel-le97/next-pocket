/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { Transition } from "@headlessui/react";
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
  const user = AppState.user
  const router = useRouter();

  useEffect(() => {
    setServers(AppState.userServers);
    if (router.query.id && servers) {
      let server = servers.find((s) => s?.id == router.query.id);
      AppState.activeServer = server;
      AppState.messages = [];
    }
  }, [AppState.userServers, router.query.id]);

  return (
    <>
      {servers &&
        servers.map((s, index) => <ServerIcon server={s} key={index} />)}
      {servers &&
        servers.map((s, index) => <ServerIcon server={s} key={index} />)}
      {servers &&
        servers.map((s, index) => <ServerIcon server={s} key={index} />)}
      {servers &&
        servers.map((s, index) => <ServerIcon server={s} key={index} />)}
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
    //     AppState.activeChannel = null
    // AppState.messages = []
    router.push(`http://localhost:3000/server/${server.id}`);
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
      <div className=" sidebar-icon group  relative  snap-start ">
        <img
          src={server?.expand?.image?.url}
          alt="UserIcon"
          className={
            activeServer?.id == server.id
              ? "h-12 w-12  rounded-xl border-2 border-white object-cover  transition-all duration-300 ease-linear"
              : "h-12 w-12  rounded-3xl object-cover transition-all duration-300 ease-linear hover:rounded-xl"
          }
          onClick={handleClick}
        />

        <span className=" sidebar-tooltip group-hover:scale-100 ">
          {server.name}
          {/* {JSON.stringify(server)} */}
        </span>
        {activeServer?.id !== server.id ? (
          <span className=" absolute -left-3.5 h-3 w-3 rounded-full bg-white transition-all duration-300   ease-linear"></span>
        ) : (
          <span className=" absolute -left-3.5 h-10 w-2.5 rounded-full bg-white transition-all duration-300   ease-linear"></span>
        )}
      </div>

      {/* <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
             
                </Transition.Child>
              </div>
            </div>
         */}
    </Transition>
  );
};

export default observer(ServerSelection);
