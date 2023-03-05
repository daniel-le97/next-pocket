import { observer } from "mobx-react-lite";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsBadge4K, BsCheck, BsCircle, BsCircleFill } from "react-icons/bs";
import { AppState } from "../../AppState";
import { Collections } from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";
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
      <main className="dark flex min-h-screen  w-full flex-col  bg-zinc-800 ">
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

        <div className="  container mt-16 flex flex-wrap gap-5">
          {servers && servers.map((s) => <ServerCard server={s} key={s.id} />)}
        </div>
      </main>
    </>
  );
};

const ServerCard = ({ server }: { server: any }) => {
  const [userStatus, setUserStatus] = useState([]);
  const user = pb.authStore.model;
  async function joinServer() {
    const data = {
      serverId: server.id,
      memberId: user?.id,
    };
    // const data = new FormData
    await serversService.joinServer(data);
  }
  useEffect(() => {
    const getUserStatus = async () => {
      const res = await pb.collection(Collections.UsersStatus).getList(1, 50, {
        filter: `isOnline = true`,
      });
      setUserStatus(res.items);
    };
    // getUserStatus()
  }, []);
  return (
    <div
      onClick={joinServer}
      className="group  h-auto w-1/3 overflow-hidden rounded-xl bg-gradient-to-t from-zinc-900   to-gray-600 text-white shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gradient-to-t hover:from-zinc-900 hover:to-gray-700 hover:shadow-xl"
    >
      <img
        src={server.imageUrl}
        alt=""
        className="h-40 w-full rounded-t-xl object-cover"
      />

      <div className="mt-2 p-3">
        <div className="flex items-center gap-x-2 ">
          <div className="rounded-3xl bg-green-600">
            <BsCheck />
          </div>
          <h1>{server.name}</h1>
        </div>
        <p className="mt-2">{server.description}</p>
      </div>
      <div className=" m-2 flex items-center gap-x-2 ">
        <BsCircleFill size={10} className="text-gray-300" />
        {server.members.length}
        <small>Members</small>
      </div>
      {/* {userStatus.length} */}
    </div>
  );
};
export default observer(Explore);
