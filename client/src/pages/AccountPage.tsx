/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { NextPage } from "next";
import type { Admin, Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/User";
import type { ServersResponse } from "../../PocketBaseTypes/pocketbase-types";
// import { AppState } from "../../AppState.js";
import { pb } from "../../utils/pocketBase";
import Pop from "../../utils/Pop";
import { accountsService } from "../services/AccountsService";
import { serversService } from "../services/ServersService";

function AccountPage() {
  const [user, setUser] = useState<Record | Admin | null>();
  const [servers, setServers] = useState<ServersResponse<unknown>>();
  useEffect(() => {
    console.log(pb.authStore.model);
    const currentUser = pb.authStore.model;
    if (currentUser) {
      setUser(currentUser);
      const getServers = async () => {
        const servers = await serversService.getUserServers(currentUser.id);
        setServers(servers);
      };
      getServers();
    }
    serversService
      .getUserServers(pb.authStore.model?.id)
      .then((value) => setServers(value));
  }, []);

  return (
    <main className="  min-h-screen dark:bg-zinc-800  ">
      <div className="account-page">
        <div className="card  flex flex-col  justify-center   ">
          <div className=" flex justify-center p-5 text-center ">
            <img
              src={user?.avatarUrl}
              alt="Profile Image"
              className="h-32 w-32 rounded-full shadow-md shadow-zinc-900"
            />
          </div>
          <div className="card-body p-5 text-center flex justify-center">
            {/* {JSON.stringify(user)} */}
            <EditAccount  />
          </div>
        </div>
      </div>
    </main>
  );
}

const EditAccount = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      emailVisibility: false,

      avatarUrl: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      await accountsService.updateAccount(data);
      reset();
    } catch (error) {
      console.error("createServer", error);

      // await uploadService.deleteFile(data.image);
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
          {...register("username", {
            required: true,
            maxLength: 30,
            minLength: 5,
          })}
          type="text"
          // onChange={handleChange}

          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
        />
      </div>
      <div className="flex flex-col text-start">
        <label>AvatarUrl:</label>
        <input
          {...register("avatarUrl", {
            required: true,
           
          })}
          type="url"
          // onChange={handleChange}

          className="m-1 ml-3 rounded-sm bg-gray-300 p-1 text-black placeholder:text-gray-100 required:border-2 required:border-red-400"
        />
      </div>
      <div className="flex flex-col text-start">
        <label>Email Visibility</label>
        <input
          {...register("emailVisibility", {
            required: true,
           
          })}
          type="checkbox"
          // onChange={handleChange}

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
