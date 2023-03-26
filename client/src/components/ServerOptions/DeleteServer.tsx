/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
// import { Server } from "http"
import { serversService } from "@/services/ServersService";
import { AppState } from "AppState";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import React from "react";
import { FaUserMinus } from "react-icons/fa";
import Pop from "utils/Pop";

// import type { Server } from "../../../PocketBaseTypes/utils"

const DeleteServer = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const server = AppState.activeServer;
  const user = AppState.user
  const handleClick = async () => {
    try {
      const yes = await Pop.confirm();
      if (!yes) {
        return;
      }
      console.log(server?.owner, server?.id);

      await serversService.DeleteServer(server!.owner!, id);
      router.push("/");
    } catch (error) {
      Pop.error(error);
    }
  };

  return (
    <div className="w-full">
      {user?.id == server?.owner ? (
        <button className=" server-options" onClick={handleClick}>
          Delete Server
          <FaUserMinus size={15} />
        </button>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};
export default observer(DeleteServer);
    