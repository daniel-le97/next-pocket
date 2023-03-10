/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState, Fragment } from "react";

import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

import { observer } from "mobx-react-lite";

import { userService } from "../../services/UserService";
import { pb } from "../../../utils/pocketBase";
import { channelsService } from "../../services/ChannelsService";
import { AppState } from "../../../AppState";
import UserStatus from "../Messages/UsersStatus";
import Pop from "../../../utils/Pop";
import {
  FriendsResponse,
  UsersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Transition, Dialog } from "@headlessui/react";
import { BsPlusCircleFill } from "react-icons/bs";
import { friendService } from "../../services/FriendService";
const topics = ["general", "tailwind-css", "react"];

const FriendsBar = () => {
  const [friends, setFriends] = useState([]);
  const user = pb.authStore.model;
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await friendService.getUserFriendsList(user?.id);
        console.log(res);

        //  setFriends(res)
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchFriends();
  }, []);
  return (
    <div className="channel-bar ">
      <div className="channel-block">
        <h5 className="channel-block-text">Direct Messages</h5>
      </div>
      <div className="px-3">
        {friends &&
          friends.map((friend, index) => <User user={friend} key={index} />)}
      </div>
    </div>
  );
};

const User = ({ user }: { user: UsersResponse }) => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    console.log("hi");

    setIsOpen(true);
  }
  return (
    <div
      onClick={openModal}
      className="user-container my-3 flex cursor-pointer gap-x-2 rounded-md p-2 transition-all duration-150 ease-in hover:bg-zinc-500 hover:bg-opacity-25  "
    >
      <div className="relative">
        <img
          src={user.avatarUrl}
          alt="userIcon"
          width={30}
          className="rounded-full shadow-md shadow-zinc-900"
        />
        <div className="absolute left-8 top-9">
          {user && <UserStatus user={user} />}
        </div>
      </div>
      <Menu isOpen={isOpen} />
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};

const Menu = (props: { isOpen: boolean }) => {
  let { isOpen } = props; // access the isOpen boolean via props

  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      image: "",
      members: [],

      description: "",
    },
  });
  const onSubmit = async (data: any) => {
    try {
      reset();
      setImageUrl("");

      router.push(`http://localhost:3000/server/${newServer.id}`);
    } catch (error) {
      console.error("createServer", error);
    }
  };

  function closeModal() {
    isOpen = false;
  }

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p>
                  </div>

                  <div className="mt-4">
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

// @ts-ignore

export default observer(FriendsBar);
