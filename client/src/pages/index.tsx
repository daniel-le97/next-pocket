/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsCheck, BsCircleFill } from "react-icons/bs";
import { FaStar, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { AppState } from "../../AppState";
import type { UsersStatusResponse } from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import type { Server } from "../../PocketBaseTypes/utils";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import { membersService } from "../services/MembersService";

import { serversService } from "../services/ServersService";

const Explore: NextPage = () => {
  const router = useRouter();
  const servers = AppState.servers;
  useEffect(() => {
    const user = pb.authStore.model;
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const getServers = async () => {
      await serversService.getServersList();
    };
    getServers();
  }, []);

  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="  dark flex min-h-screen  w-full flex-col bg-gray-300  dark:bg-zinc-800 ">
        <div className="explore-banner  relative mt-8 flex items-center justify-center">
          <div className="relative ">
            <img
              src="https://img.freepik.com/free-vector/telescope-science-discovery-watching-stars-planets-outer-space_107791-4920.jpg?w=900&t=st=1677706310~exp=1677706910~hmac=1f7b435bec55558f1de8b5bc54632ee088625c1772d5eb3c102107da67f9327a"
              alt=""
              className="rounded-xl shadow-md shadow-zinc-900 "
            />
            <div className=" absolute top-24 left-80 text-2xl  font-bold text-white">
              Find your community
            </div>
          </div>
        </div>

        <div className="   mx-auto mt-16  flex  flex-wrap justify-center gap-5  px-12 ">
          {servers && servers.map((s) => <ServerCard server={s} key={s.id} />)}
        </div>
      </main>
    </>
  );
};

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
    getUserStatus();

    const checkIfMember = async () => {
      const member = await membersService.getUserMemberRecord({
        user: user?.id as string,
        server: router.query.id as string,
      });
  if (member) {
    setIsMember(true)
  }
    };
    checkIfMember();
  }, []);
  return (
    <div className=" group  h-auto w-full overflow-hidden rounded-xl bg-gray-300  from-zinc-900 to-gray-600 text-white   shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gradient-to-t hover:from-zinc-900 hover:to-gray-700 hover:shadow-xl dark:bg-gradient-to-t sm:w-1/4 relative">
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
          {isMember ? (
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
        <small>Members</small>
      </div>
      {/* {userStatus.length} */}
    </div>
  );
};
export default observer(Explore);
