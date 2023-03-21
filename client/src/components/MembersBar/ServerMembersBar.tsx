import React, { useEffect, useState } from "react";

import { FaChevronDown, FaChevronRight, FaPlus } from "react-icons/fa";

import { observer } from "mobx-react";

import { pb } from "../../../utils/pocketBase";
import ChannelSelection from "../ChannelsBar/ChannelSelection";
import { AppState } from "../../../AppState";
import { userService } from "../../services/UserService";
import type { UsersResponse } from "../../../PocketBaseTypes/pocketbase-types";
import UserStatus from "../Messages/UsersStatus";
import { BsArrowLeft, BsArrowLeftCircle, BsArrowRight, BsArrowRightCircle } from "react-icons/bs";
// const topics = ["general", "tailwind-css", "react"];

const MembersBar = () => {
  const users = AppState.users;
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const getUsersList = async () => {
      // await userService.getUsersByServerId();
    };
    // getUsersList();
  }, []);

  return (
    <>
      <div
        className={
          collapsed ? "server-members-bar   " : " server-members-bar-collapsed "
        }
      >
        <div className="channel-block">
          <h5 className="channel-block-text">Members</h5>
          <div className=" mx-auto my-2 rounded-3xl  text-gray-500">
            {" "}
            {collapsed ? (
              <BsArrowRightCircle
                size={24}
                onClick={() => setCollapsed(!collapsed)}
                className="cursor-pointer"
              />
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
        <div className=" flex flex-col gap-y-3 px-3">
          {users &&
            users.map((u, index) => (
              <div
                className="relative cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-slate-500"
                key={u.id}
              >
                <User user={u} />
              </div>
            ))}
        </div>
      </div>
      {!collapsed && (
        <div className=" absolute  right-5 top-1.5 mx-auto my-2 rounded-3xl   text-gray-500 transition-all duration-200">
          <BsArrowLeftCircle
            size={24}
            onClick={() => setCollapsed(!collapsed)}
            className="cursor-pointer"
          />
        </div>
      )}
    </>
  );
};

// @ts-ignore
const Dropdown = ({ header, selections }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="dropdown">
      <div onClick={() => setExpanded(!expanded)} className="dropdown-header">
        <ChevronIcon expanded={expanded} />
        <h5
          className={
            expanded ? "dropdown-header-text-selected" : "dropdown-header-text"
          }
        >
          {header}
        </h5>
        <FaPlus
          size="12"
          className="text-accent my-auto ml-auto text-opacity-80"
        />
      </div>
      {expanded &&
        selections &&
        // @ts-ignore
        selections.map((selection) => (
          <ChannelSelection selection={selection} key={selection} />
        ))}

      <div className="mt-10"></div>
    </div>
  );
};

// @ts-ignore
const ChevronIcon = ({ expanded }) => {
  const chevClass = "text-accent text-opacity-80 my-auto mr-1";
  return expanded ? (
    <FaChevronDown size="14" className={chevClass} />
  ) : (
    <FaChevronRight size="14" className={chevClass} />
  );
};

// @ts-ignore

const ChannelBlock = () => (
  <div className="channel-block">
    <h5 className="channel-block-text">Channels</h5>
  </div>
);

const User = ({ user }: { user: UsersResponse }) => {
  return (
    <div className="user-container flex gap-x-2  ">
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

export default observer(MembersBar);
