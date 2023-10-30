/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState} from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import Pop from "utils/Pop";
import type { Friend, UsersResponse } from "PocketBaseTypes";
import { AppState } from "AppState";
import { friendsService, usersStatusService } from "@/services";

import UserStatus from "../Messages/UsersStatus";
import type { UnsubscribeFunc } from "pocketbase";
import { FaPersonBooth } from "react-icons/fa";
import UserProfileBar from "../GlobalComponents/UserProfileBar";



const FriendsBar = () => {
  const friends = AppState.friends?.filter((friend) => friend.status === "accepted");
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
        // console.log('unsubbed from friends records');
      }
      if (subDm) {
        // console.log('unsubbed from dm status');
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
            friends?.map((friend, index) => (
              <UserCard friendShip={friend}  key={index} />
            ))}
        </div>
      </div>
      <UserProfileBar user={user as UsersResponse}/>
    </div>
  );
};

const UserCard = ({ friendShip}: { friendShip: Friend}) => {
  // console.log('friendShip', friendShip);
  
  // const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  // function closeModal() {
  //   setIsOpen(false);
  // }
  
  // function openModal() {
  //   setIsOpen(true);
  // }
  if (!friendShip) return (<div>NO USER</div>)
  
  const handleClick = () => {
    router.push(`/DirectMessages/${friendShip.id}`);
  };
  
  return (
    <div
      onClick={handleClick}
      className="friendShip-container my-3 flex cursor-pointer gap-x-2 rounded-md p-2 transition-all duration-150 ease-in hover:bg-zinc-500 hover:bg-opacity-25  "
    >
      <div className="relative">
        <img
          src={friendShip.friend?.avatarUrl}
          alt="userIcon"
          width={40}
          className="rounded-full shadow-md shadow-zinc-900"
        />
        <div className="absolute left-11 top-10">
          {friendShip.activityStatus && <UserStatus status={friendShip.activityStatus} />}
        </div>
      </div>
      {/* <Menu isOpen={isOpen} /> */}
      <small className=" font-bold text-rose-600">{friendShip.friend?.username}</small>
    </div>
  );
};



// @ts-ignore

export default observer(FriendsBar);
