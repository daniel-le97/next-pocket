import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useUser } from "../../../utils/pocketBase";
import Pop from "../../../utils/Pop";
import { serversService } from "../../services/ServersService";

const LeaveServer = ({ server }: { server: any }) => {
  const user = useUser();
  const router = useRouter();
 
  const leaveServer = async () => {
    try {
      const data = {
        server: server.id,
        user: user?.id,
      };
   
      
      const yes = await Pop.confirm();
      if (!yes) {
        return;
      }
      await serversService.leaveServer(data);
      router.push("/");
      Pop.success("left Server");
    } catch (error) {
      Pop.error(error);
    }
  };

  return (
    <div
      className=" cursor-pointer rounded-md bg-gray-400 p-2 shadow-md hover:bg-gray-600"
      onClick={leaveServer}
    >
      Leave <small>{server.name}</small>
    </div>
  );
};
export default observer(LeaveServer);
