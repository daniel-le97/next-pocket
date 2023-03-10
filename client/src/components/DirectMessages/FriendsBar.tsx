/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from "react";

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
const topics = ["general", "tailwind-css", "react"];

const FriendsBar = () => {
  const [friends, setFriends] = useState<UsersResponse<unknown>[]>([])
 
useEffect(()=>{
  setFriends(AppState.users)
},[AppState.users])
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
  return (
    <div className="user-container my-3 flex cursor-pointer gap-x-2 rounded-md p-2 transition-all duration-150 ease-in hover:bg-zinc-500 hover:bg-opacity-25  ">
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
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};

// @ts-ignore

export default observer(FriendsBar);
