/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import type { UsersStatusResponse } from "../../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../../utils/pocketBase";
import { useEffect, useState, Fragment } from "react";
import Pop from "../../../utils/Pop";
import { membersService } from "../../services/MembersService";
import { BsCheck, BsCircleFill } from "react-icons/bs";
import React from "react";
import type {
  Server,
  ServerWithRelations,
} from "../../../PocketBaseTypes/utils";
import { Transition } from "@headlessui/react";
import { AppState } from "~/AppState";
import { serversService } from "@/services";
const ServerCard = ({ server }: { server: Server }) => {
  const [userStatus, setUserStatus] = useState<UsersStatusResponse[]>([]);
  const user = pb.authStore.model;
  const router = useRouter();
  const [isMember, setIsMember] = useState(false);

  async function joinServer() {
    try {
      if (!user) {
        return;
      }
      const data = {
        server: server.id,
        user: user.id,
      };
      const yes = await Pop.confirm(
        `Join ${server.name}?`,
        "you will be directed to the server page",
        "Join",
        "question"
      );
      if (!yes) {
        return;
      }
      await membersService.joinServer(data);


      router.push(`/server/${server.id}/channel/${AppState.activeChannel?.id}`);
            await serversService.getServersList(AppState.page);
    } catch (error) {
      Pop.error(error, "Join Server");
    }
  }

  const checkIfMember = () => {
    if (server.members?.find((m) => m.user === user?.id)) {
      setIsMember(true);
    }
  };

  useEffect(() => {
    // console.log('changed');

    checkIfMember();
  }, [AppState.userServers]);

  return (
    <Transition
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={`server-card group  ${
          isMember
            ? "bg-gray-300 from-zinc-900 to-green-400 hover:from-zinc-900 hover:to-emerald-500"
            : "bg-gray-300 from-zinc-900 to-gray-600"
        }`}
      >
        <img src={server.image.url} alt="" className="server-image" />

        <div className="mt-2 p-3">
          <div className=" flex w-full justify-between ">
            <div className=" server-name ">{server.name}</div>
            {!isMember ? (
              <button className="group/join relative  " onClick={joinServer}>
                <FaUserPlus size={20} />
                <span className=" join-button-tooltip">Join</span>
              </button>
            ) : (
              <FaUserCheck size={20} className="text-emerald-500" />
            )}
          </div>
          <p className="mt-2 pb-10">{server.description}</p>
        </div>
        <div className="server-members-count  ">
          <BsCircleFill size={10} className="text-gray-300" />
          {server.members?.length}

          <small>Members</small>
        </div>
      </div>
    </Transition>
  );
};
export default observer(ServerCard);
