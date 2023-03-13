/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import ServerCard from "../components/Explore/ServerCard";
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
          {servers && servers.map((s) =>
           <ServerCard server={s} key={s.id} />
           )}
        </div>
      </main>
    </>
  );
};

export default observer(Explore);
