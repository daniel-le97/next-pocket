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
const topics = ["general", "tailwind-css", "react"];

const FriendsBar = () => {
  const channels = AppState.channels;
  const server = AppState.activeServer;
  const [expanded, setExpanded] = useState(true);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
  
    
    const getFriendsList = async () => {
      await userService.getUsersList();
    };
    getFriendsList();
    setFriends(AppState.users);
   ;
    
  }, []);

  return (
    <div className="channel-bar ">
      <div className="channel-block">
        <h5 className="channel-block-text">Direct Messages</h5>
      </div>
      <div className="px-3">
        {friends && friends.map((f) => <User user={f}/>)}
      </div>
    </div>
  );
};


const User = ({ user }: { user: UsersResponse }) => {
  return (
    <div className="user-container flex gap-x-2 my-3 hover:bg-zinc-500 transition-all duration-150 ease-in p-2 rounded-md cursor-pointer hover:bg-opacity-25  ">
      <div className="relative">
        <img
          src={user.avatarUrl}
          alt="userIcon"
          width={30}
          className="rounded-full shadow-md shadow-zinc-900"
        />
        <div className="absolute left-8 top-9">
          <UserStatus user={user} key={user?.id} />
        </div>
      </div>
      <small className=" font-bold text-rose-600">{user.username}</small>
    </div>
  );
};

// @ts-ignore

export default observer(FriendsBar);
