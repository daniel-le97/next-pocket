/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { membersService } from "@/services/MembersService";
import { AppState } from "AppState";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Pop from "utils/Pop";

const LeaveServer = () => {
  const user = AppState.user;
  const server = AppState.activeServer;
  const router = useRouter();
  const leaveServer = async () => {
    try {
     
      if(!server && !user){
        Pop.error('unable to find server and user ids')
        return
      }
      const data ={
        server: server!.id,
        user: user!.id
      }

      const yes = await Pop.confirm(`Leave ${server?.name}`,"Are You Sure?",'question','Confirm');
      if (!yes) {
        return;
      }
      await membersService.leaveServer(data);
      void router.push("/");
      Pop.success("left Server");
    } catch (error) {
      Pop.error(error);
    }
  };

  return (
    <button className="server-options" onClick={leaveServer}>
      Leave <small>{server && server.name}</small>
    </button>
  );
};
export default observer(LeaveServer);
