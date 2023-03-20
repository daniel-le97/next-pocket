/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useUser } from "../../../utils/pocketBase";
import Pop from "../../../utils/Pop";
import { membersService } from "../../services/MembersService";
import type { Server } from "../../../PocketBaseTypes/utils";
import React from "react";
import { AppState } from "../../../AppState";
const LeaveServer = ({ server }: { server: Server}) => {
  const user = AppState.user
  const router = useRouter();
  const leaveServer = async () => {
    try {
      const data = {
        server: server.id,
        user: user!.id,
      };

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
    <button
      className=" server-button   "
      onClick={leaveServer}
    >
      Leave <small>{server && server.name}</small>
    </button>
  );
};
export default observer(LeaveServer);
