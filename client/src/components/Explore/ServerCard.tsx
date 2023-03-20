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
import { useEffect, useState } from "react";
import Pop from "../../../utils/Pop";
import { membersService } from "../../services/MembersService";
import { BsCheck, BsCircleFill } from "react-icons/bs";
import React from "react";
import type { Server } from "../../../PocketBaseTypes/utils";
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
      const isMember = await membersService.joinServer(data);
      // console.log('isMember',isMember);

      if (isMember) {
        isMember.new == true ? Pop.success(`Welcome to ${server.name}`) : "";
      }
      router.push(`server/${server.id}`);
    } catch (error) {
      Pop.error(error, "Join Server");
    }
  }

  const checkIfMember = () => {
    if (server.members?.includes(user?.id)) {
      setIsMember(true);
    }
  };
  useEffect(() => {
    checkIfMember();
  }, []);

  return (
    <div
      className={`server-card group  ${
        isMember
          ? "bg-gray-300 from-zinc-900 to-green-400 hover:from-zinc-900 hover:to-green-500"
          : "bg-gray-300 from-zinc-900 to-gray-600"
      }`}
    >
      <img
        src={server.expand?.image.url}
        alt=""
        className="server-image"
      />

      <div className="mt-2 p-3">
        <button className=" flex justify-between w-full ">
        
          <div className=" server-name ">{server.name}</div>
          {!isMember ? (
            <div
              className="group/join relative cursor-pointer"
              onClick={joinServer}
            >
              <FaUserPlus size={20} />
              <span className=" join-button-tooltip">
                Join
              </span>
            </div>
          ) : (
            <FaUserCheck size={20} className="text-green-400" />
          )}
        </button>
        <p className="mt-2 pb-10">{server.description}</p>
      </div>
      <div className="server-members-count  ">
        <BsCircleFill size={10} className="text-gray-300" />
        {server.members?.length}
        {/* {server.members.map((m) => (
          <div className=" ">{JSON.stringify(m)}</div>
        ))} */}
        <small>Members</small>
      </div>
      {/* {userStatus.length} */}
    </div>
  );
};
export default observer(ServerCard);
