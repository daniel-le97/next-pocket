
import { observer } from "mobx-react-lite";
import { AppState } from "../../../AppState";
import { ServersResponse } from "../../../pocketbase-types";

const ServerSelection = () => {
  const servers = AppState.servers;

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
          <ServerIcon server={s} />
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
  <div className="sidebar-icon group">
    <img src={server.image} alt="UserIcon" className="rounded-full" />
    <span className=" sidebar-tooltip group-hover:scale-100">
      {server.name}
    </span>
  </div>
);

export default observer(ServerSelection);
