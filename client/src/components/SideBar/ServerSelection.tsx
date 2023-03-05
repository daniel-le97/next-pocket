/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AppState } from "../../../AppState";
import type { ServersResponse } from "../../../pocketbase-types";
import { serversService } from "../../services/ServersService";

const ServerSelection = () => {
  const servers = AppState.servers;

  useEffect(()=>{
const getServers = async () =>{
  await serversService.getServersList()

}
getServers()
  },[])
  return (
    <>
      {servers &&
        servers.map((s) => (
          <ServerIcon server={s}  key={s.id}/>
        ))}
    </>
  );
};

const ServerIcon = ({ server }: { server: ServersResponse }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`http://localhost:3000/server/${server.id}`);
  }
  
  return (<div className=" sidebar-icon group ">
    <img
      src={server?.expand?.image?.url }
      alt="UserIcon"
      className="rounded-3xl w-12 h-12 object-cover"
      onClick={handleClick}
    />

    <span className=" sidebar-tooltip group-hover:scale-100">
      {server.name}
    </span>
  </div>)
};

export default observer(ServerSelection);
