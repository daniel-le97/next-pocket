/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState} from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Transition, Dialog } from "@headlessui/react";
import Pop from "utils/Pop";
import { User} from "PocketBaseTypes";
import type { Friend, UsersResponse, UsersStatusResponse } from "PocketBaseTypes";
import { AppState } from "AppState";
import { friendsService, usersStatusService } from "@/services";
import { UserIcon } from "../ChannelsBar/ChannelsBar";
import UserStatus from "../Messages/UsersStatus";
import { UnsubscribeFunc } from "pocketbase";
import { FaPersonBooth } from "react-icons/fa";

const topics = ["general", "tailwind-css", "react"];

const FriendsBar = () => {
  const friends = AppState.friends;
  // console.log('friends', friends);
  
  const user = AppState.user;
  const router = useRouter();
  const goToFriends = () => {
    router.push("/DirectMessages");
  };
  useEffect(() => {
    let friendSubscribe: UnsubscribeFunc | null
    let friendStatusSubscribe: UnsubscribeFunc | null
    (async () => {
      try {
        if (!user) return;
        await friendsService.getUserFriendsList();
        friendSubscribe = await friendsService.subscribe()
        friendStatusSubscribe = await usersStatusService.subscribeDM()
      } catch (error) {
        Pop.error(error);
      }
    })();
    return () => {
     const sub = friendSubscribe?.();
     const subDm =  friendStatusSubscribe?.();
      if (sub) {
        console.log('unsubbed from friends records');
      }
      if (subDm) {
        console.log('unsubbed from dm status');
      }
    }
  }, []);
  return (
    <div className="friends-bar">
      <div>
        <h5 className="channel-block-text" onClick={() => goToFriends()}>
          <div className="">
            <FaPersonBooth className="inline-block mr-2" />
            Friends
          </div>
        </h5>
        <div className="channel-block">
          <h5 className="channel-block-text">Direct Messages</h5>
        </div>
        <div className="px-3 ">
          {friends &&
            friends?.friends?.map((friend, index) => (
              <UserCard user={friend.user} status={friend.onlineStatus} key={index} />
            ))}
        </div>
      </div>
      {/* <UserIcon user={user} /> */}
      <UserIcon user={user as UsersResponse}/>
    </div>
  );
};

const UserCard = ({ user, status }: { user: Partial<UsersResponse>, status : UsersStatusResponse}) => {
  // console.log('user', user);
  
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // function closeModal() {
  //   setIsOpen(false);
  // }
  
  // function openModal() {
  //   setIsOpen(true);
  // }
  if (!user) return (<div>NO USER</div>)
  
  const handleClick = () => {
    router.push(`/DirectMessages/${user.id!}`);
  };
  
  return (
    <div
      onClick={handleClick}
      className="user-container my-3 flex cursor-pointer gap-x-2 rounded-md p-2 transition-all duration-150 ease-in hover:bg-zinc-500 hover:bg-opacity-25  "
    >
      <div className="relative">
        <img
          src={user.avatarUrl}
          alt="userIcon"
          width={40}
          className="rounded-full shadow-md shadow-zinc-900"
        />
        <div className="absolute left-11 top-10">
          {user && <UserStatus status={status.status!} />}
        </div>
      </div>
      {/* <Menu isOpen={isOpen} /> */}
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};



// @ts-ignore

export default observer(FriendsBar);
