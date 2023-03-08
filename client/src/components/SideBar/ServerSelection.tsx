/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppState } from "../../../AppState";
import type { ServersResponse } from "../../../pocketbase-types";
import { useUser } from "../../../utils/pocketBase";
import { serversService } from "../../services/ServersService";

const ServerSelection = () => {
  const servers = AppState.userServers;
const user = useUser()
  useEffect(() => {
    const getServers = async () => {
      await serversService.getUserServers(user?.id)
    };
    // getServers();
  }, []);
  return (
    <>{servers && servers.map((s) => <ServerIcon server={s} key={s.id} />)}</>
  );
};

const ServerIcon = ({ server }: { server: ServersResponse }) => {
  const router = useRouter();
  const activeServer = AppState.activeServer;
  const handleClick = () => {
    AppState.activeServer = server;
    
    router.push(`http://localhost:3000/server/${server.id}`);
    
  };

  return (
    <div className=" sidebar-icon group  relative">
      <img
        src={server?.expand?.image?.url}
        alt="UserIcon"
        className={
          activeServer?.id === server.id
            ? "h-12 w-12 rounded-3xl rounded-xl border-2 border-white object-cover transition-all duration-300 ease-linear"
            : "h-12 w-12 rounded-3xl object-cover transition-all duration-300 ease-linear hover:rounded-xl"
        }
        onClick={handleClick}
      />

      <span className=" sidebar-tooltip group-hover:scale-100">
        {server.name}
      </span>
      {activeServer?.id === server.id && (
        <span className=" absolute -left-3.5 h-3 w-3 rounded-full bg-white transition-all duration-300   ease-linear"></span>
      )}
    </div>
  );
};

export default observer(ServerSelection);
