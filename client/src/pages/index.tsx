/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import ServerCard from "../components/Explore/ServerCard";
import { serversService } from "../services/ServersService";
import React from "react";
import SearchBar from "@/components/Explore/SearchBar";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { debounce } from "lodash";
import ServerPagination from "@/components/Explore/ServerPagination";
import { Server, type ServerWithRelations } from "~/PocketBaseTypes";
import bannerImage from "../assets/banner-image.svg";
const Explore: NextPage = () => {
  const router = useRouter();
  // const servers = AppState.servers;
  const [servers, setServers] = useState(AppState.servers);

  useEffect(() => {
    const user = pb.authStore.model;
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const getServers = async () => {
      AppState.page = 1;

      await serversService.getServersList(AppState.page);
    };
    getServers();
  }, []);

  useEffect(() => {
    setServers(AppState.servers);
  }, [AppState.servers]);
  return (
    <>
      <Head>
        <title>next-pocket</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="  dark flex min-h-screen  w-full flex-col bg-zinc-800 ">
        <ExploreBanner />
        <SearchBar />
        <ServerPagination
          onPageChange={(page) => {
            AppState.page = page;
            serversService.getServersList(page);
          }}
          totalPages={AppState.totalPages}
        />
        <div className="mb-4  flex  flex-wrap    justify-center ">
          {servers && servers.map((s) => <ServerCard server={s} key={s.id} />)}
        </div>
      </main>
    </>
  );
};

const ExploreBanner = () => {
  return (
    <div className="explore-banner  ">
      <div className="relative  ">
        <img
          src={bannerImage.src}
          alt="spaceman"
          width={400}
          className=" shadow-zinc-900  "
        />
        {/* <div className=" absolute left-80 top-24 text-2xl  font-bold text-white">
          Find your community
        </div> */}
      </div>
    </div>
  );
};

export default observer(Explore);
