
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { AppState } from "../../../AppState";
import { ServersResponse } from "../../../pocketbase-types";
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
          // <div className="sidebar-icon group">
          //   <img src={s.image} alt="UserIcon" className="rounded-full" />
          //   <span className=" sidebar-tooltip group-hover:scale-100">
          //     {s.name}
          //   </span>
          // </div>
          <ServerIcon server={s}  key={s.id}/>
        ))}
    </>
    // <div className="sidebar-icon group">
    //   <img
    //     src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=234`}
    //     alt="UserIcon"
    //     className="rounded-full"
    //   />
    //   <span className=" sidebar-tooltip group-hover:scale-100">
    //     Server To Add{" "}
    //   </span>

    // </div>
  );
};

const ServerIcon = ({ server }: { server: ServersResponse }) => (
  <div className=" sidebar-icon group ">
    <img
      src={server.imageUrl}
      alt="UserIcon"
      className="rounded-3xl w-12 h-12 object-cover"
    />

    <span className=" sidebar-tooltip group-hover:scale-100">
      {server.name}
    </span>
  </div>
);

export default observer(ServerSelection);
