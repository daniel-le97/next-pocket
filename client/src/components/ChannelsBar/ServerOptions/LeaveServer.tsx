/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { serversService } from "@/services";
import { membersService } from "@/services/MembersService";
import { AppState } from "AppState";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { FaUserMinus } from "react-icons/fa";
import Pop from "utils/Pop";

const LeaveServer = ({ toggleOpen }: { toggleOpen: () => void }) => {
  const user = AppState.user;
  const server = AppState.activeServer;
  const router = useRouter();
  const handleClose = () => {
    toggleOpen();
  };
  const leaveServer = async () => {
    try {
      if (!server && !user) {
        Pop.error("unable to find server and user ids");
        return;
      }

      const data = {
        server: server!.id,
        user: user!.id,
      };

      const yes = await Pop.confirm(
        `Leave ${server?.name}`,
        "Are You Sure?",
        "question",
        "Confirm"
      );
      if (!yes) {
        return;
      }
      await membersService.leaveServer(data);
      await serversService.getServersList(AppState.page)
      void router.push("/");
      Pop.success("left Server");
    } catch (error) {
      Pop.error(error);
    }
  };

  return (
    <button
      className="server-options-selection"
      onClick={() => {
        leaveServer();
        handleClose();
      }}
    >
      Leave Server
      <FaUserMinus size={20} />
    </button>
  );
};
export default observer(LeaveServer);
