/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import type {
  UsersStatusResponse} from "../../../PocketBaseTypes/pocketbase-types";
import {
  Collections
} from "../../../PocketBaseTypes/pocketbase-types";
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
  useEffect(() => {
    const getUserStatus = async () => {
      const res = await pb
        .collection(Collections.UsersStatus)
        .getList<UsersStatusResponse>(1, 50, {
          filter: `isOnline = true`,
        });
      setUserStatus(res.items);
    };
    // getUserStatus();

    const checkIfMember = async () => {
      const member = await membersService.getUserMemberRecord({
        user: user?.id as string,
        server: server.id,
      });

      if (member) {
        setIsMember(true);
      }
    };
    // checkIfMember();
  }, []);
  return (
    <div
      className={` group  relative h-auto w-full overflow-hidden rounded-xl     text-white shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gradient-to-t hover:from-zinc-900 hover:to-gray-700 hover:shadow-xl dark:bg-gradient-to-t sm:w-1/4  ${
        isMember
          ? "bg-gray-300 from-zinc-900 to-green-400 hover:from-zinc-900 hover:to-green-500"
          : "bg-gray-300 from-zinc-900 to-gray-600"
      }`}
    >
      <img
        src={server.expand?.image.url}
        alt=""
        className="h-40 w-full rounded-t-xl object-cover"
      />

      <div className="mt-2 p-3">
        <div className="flex items-center gap-x-2 ">
          <div className="rounded-3xl bg-green-600 ">
            <BsCheck />
          </div>
          <h1>{server.name}</h1>
          {!isMember ? (
            <div
              className="group/join relative cursor-pointer"
              onClick={joinServer}
            >
              <FaUserPlus size={20} />
              <span className="  absolute -right-14 top-0 scale-0 rounded-md bg-zinc-900 px-2  transition-all duration-200 ease-in group-hover/join:scale-100">
                Join
              </span>
            </div>
          ) : (
            <FaUserCheck size={20} className="text-green-400" />
          )}
        </div>
        <p className="mt-2 pb-10">{server.description}</p>
      </div>
      <div className=" absolute bottom-0 left-0 m-2 flex items-center gap-x-2  ">
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
