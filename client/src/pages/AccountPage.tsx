/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { observer } from "mobx-react";
import { NextPage } from "next";
import type { Admin, Record } from "pocketbase";
import React, { useEffect, useState ,Fragment} from "react";
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
import { Dialog, Menu,Transition } from "@headlessui/react";
import { AppState } from "AppState";
import router from "next/router";
import UserAvatar from "@/components/GlobalComponents/UserAvatar";

function AccountPage() {
  const user = AppState.user;
  const servers = AppState.userServers;


const [hide, setHide] = useState(false);

  const toggleHide = () => {
    setHide(!hide);
  };

  const getEmailDisplay = () => {
    if (hide) {
      return user?.email;
    } else {
      const index = user?.email!.indexOf("@");
      const domain = user?.email!.substring(index);
      const username = user?.email!.substring(0, index);
      const maskedUsername = "*".repeat(username.length);
      return `${maskedUsername}${domain}`;
    }
  };


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
    <main className="  min-h-screen w-full   dark:bg-zinc-800">
      <div className="p-5 ">
        <div className="text-4xl font-bold text-gray-300 text-center">My Account</div>
        <div className="bg-zinc-700 rounded mt-10 shadow-md flex flex-col items-center justify-center p-5 text-center  text-gray-400 ">
          <UserAvatar avatarUrl={user?.avatarUrl!} width="w-48" height="h-48" />

          <div className=" mt-2 flex flex-col  gap-y-5  p-5 text-start text-xl font-bold">
            <div className="flex flex-col">
              <div className="text-sm">USERNAME</div>
              <div className=""> {user?.username}</div>
            </div>
            <div className="flex flex-row items-center">
              <div className="text-sm">EMAIL</div>
              <div className="ml-2">{getEmailDisplay()}</div>
              <button className="ml-2 text-sm text-indigo-500  " onClick={toggleHide}>
                {hide ? "Show" : "Hide"}
              </button>
            </div>
            <div className="flex flex-col">
              <div className="text-sm">MEMBER SINCE</div>
              <div className=""> {new Date(user?.created!).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      <EditAccount />
    </main>
  );
}

const EditAccount = () => {
  const user = AppState.user;
  const [isOpen, setIsOpen] = useState(false);
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
    <div className=" flex w-full flex-col items-center justify-center">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="dialog-modal">
                  <Dialog.Title as="h3" className="dialog-title">
                    Edit Account
                  </Dialog.Title>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="  flex flex-col gap-y-5 rounded p-5 text-gray-300"
                  >
                    <div className="flex flex-col text-start ">
                      <label>UserName</label>
                      <input
                        type="text"
                        {...register("username", {
                          minLength: 3,
                          maxLength: 30,
                          required: true,
                        })}
                      />
                    </div>
                    <div className="flex flex-col text-start">
                      <label>AvatarUrl</label>
                      <input
                        {...register("avatarUrl", {
                          required: true,
                        })}
                        type="url"
                      />
                    </div>

                    <div className="">
                      <button type="submit" className="btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <button className="btn-primary" onClick={() => setIsOpen(true)}>
        {" "}
        Edit
      </button>
    </div>
  );
};
export default observer(AccountPage);
