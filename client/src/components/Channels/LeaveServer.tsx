/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useUser } from "../../../utils/pocketBase";
import Pop from "../../../utils/Pop";
import { membersService } from "../../services/MembersService";
import { useEffect } from "react";
import { Server } from "../../../PocketBaseTypes/utils";
const LeaveServer = ({ server }: { server: Server}) => {
  const user = useUser();
  const router = useRouter();
  useEffect(() => {

  }, []);
  const leaveServer = async () => {
    try {
      const data = {
        server: server.id,
        user: user!.id,
      };

      const yes = await Pop.confirm();
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
    <div
      className=" cursor-pointer rounded-md bg-gray-400 p-2 shadow-md transition-all duration-150 ease-in hover:scale-105 hover:bg-gray-600    "
      onClick={leaveServer}
    >
      Leave <small>{server && server.id}</small>
    </div>
  );
};
export default observer(LeaveServer);
