/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { NextPage } from "next";
import type { Admin, Record } from "pocketbase";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/User";
import type { ServersResponse } from "../../pocketbase-types";
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
          <div className="card-body p-5 text-center">
            {JSON.stringify(user)}
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-zinc-700 p-3">
        <input type="text" />
      </div>
      <div className="bg-zinc-700 p-2">
        <input type="checkbox" />
      </div>
    </form>
  );
};
export default observer(AccountPage);
