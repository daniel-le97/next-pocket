/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { NextPage } from "next";
import type { Admin, Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/User";
import type {
  ServersResponse,
  UsersRecord,
} from "../../PocketBaseTypes/pocketbase-types";

import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import { accountsService } from "../services/AccountsService";
import { membersService } from "../services/MembersService";
import { Menu } from "@headlessui/react";
import { AppState } from "AppState";
import router from "next/router";
function AccountPage() {
  const user = AppState.user;
  const servers = AppState.userServers;
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
    const fetchUserServers = async () => {
      try {
        const servers = await membersService.getUserServers(user!.id);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchUserServers();
  }, []);
  

  return (
    <main className="  min-h-screen dark:bg-zinc-800  ">
      <div className="account-page">
        <div className="card  flex flex-col  justify-center   ">
          <div className=" flex flex-col items-center justify-center p-5 text-center ">
            <img
              src={user?.avatarUrl}
              alt="Profile Image"
              className="h-32 w-32 rounded-full shadow-md shadow-zinc-900"
            />

            {user?.username}
          </div>
          <div className="card-body justify-center p-5 text-center">
            {/* {JSON.stringify(user)} */}
            <EditAccount />
            
          </div>
        </div>
      </div>
    </main>
  );
}



const EditAccount = () => {
  const user = AppState.user;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username,
      emailVisibility: false,
      currentChannel: user?.currentChannel,

      avatarUrl: user?.avatarUrl,
    },
  });

  const onSubmit = async (data: UsersRecord) => {
    try {
      await accountsService.update(data);
    } catch (error) {
      Pop.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-1/2 flex-col gap-y-3 text-white "
    >
      <div className="flex flex-col text-start">
        <label>UserName:</label>
        <input
          type="text"
          // onChange={handleChange}
          {...register("username", {
            minLength: 3,
            maxLength: 30,
            required: true,
          })}
          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
        />
      </div>
      <div className="flex flex-col text-start">
        <label>AvatarUrl:</label>
        <input
          {...register("avatarUrl", {
            required:true
          })}
          type="url"
        

          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
        />
      </div>

      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};
export default observer(AccountPage);
