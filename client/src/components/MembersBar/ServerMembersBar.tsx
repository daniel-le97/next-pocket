/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { observer } from "mobx-react";
import UserStatus from "../Messages/UsersStatus";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { AppState } from "AppState";
import type { MemberUser } from "PocketBaseTypes/utils";
import { usersStatusService } from "@/services";
import Pop from "utils/Pop";
import type { UnsubscribeFunc } from "pocketbase";
import UserAvatar from "../GlobalComponents/UserAvatar";
// const topics = ["general", "tailwind-css", "react"];

const MembersBar = () => {
  const users = AppState.activeServer?.members;
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    // console.log(AppState.activeServer);

    let userStatusSubscribe: UnsubscribeFunc | null;
    (async () => {
      try {
        userStatusSubscribe = await usersStatusService.subscribe();
      } catch (error) {
        Pop.error(error);
      }
    })();
    return () => {
      userStatusSubscribe?.();
    };
  }, []);
  return (
    <>
      <div
        className={
          collapsed
            ? "m-0  h-auto  w-64 overflow-hidden bg-gray-200 shadow-lg transition-all duration-300 dark:bg-zinc-800   "
            : " h-0 w-0 cursor-none overflow-hidden bg-zinc-800  opacity-0 transition-all duration-300 "
        }
      >
        <div className="channel-block">
          <h5 className="channel-block-text">Members</h5>
          <div className=" mx-auto my-2 rounded-3xl  text-gray-500">
            {collapsed ? (
              <BsArrowRightCircle
                size={24}
                onClick={() => setCollapsed(!collapsed)}
                className="cursor-pointer  hover:text-indigo-500 dark:hover:text-emerald-500"
              />
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
        <div className=" flex flex-col gap-y-3 px-3">
          {users &&
            users.map((user, index) => (
              <div
                className="relative cursor-pointer rounded-lg p-2 transition-all duration-200 hover:bg-slate-500"
                key={index}
              >
                <User user={user} />
              </div>
            ))}

        </div>
      </div>
      {!collapsed && (
        <div className=" absolute  right-3   top-2 mx-auto my-2 rounded-3xl   text-gray-500 transition-all duration-200">
          <BsArrowLeftCircle
            size={24}
            onClick={() => setCollapsed(!collapsed)}
            className="cursor-pointer hover:text-indigo-500 dark:hover:text-emerald-500"
          />
        </div>
      )}
    </>
  );
};



const ChevronIcon = ({ expanded = false }) => {
  const chevClass = "text-accent text-opacity-80 my-auto mr-1";
  return expanded ? (
    <FaChevronDown size="14" className={chevClass} />
  ) : (
    <FaChevronRight size="14" className={chevClass} />
  );
};

const User = ({ user }: { user: MemberUser }) => {
 
  return (
    <div className="user-container flex gap-x-2  ">
      <div className="relative">
        {/* <img
          src={user.expand?.user.avatarUrl}
          alt="userIcon"
          width={30}
          className="rounded-full shadow-md shadow-zinc-900"
        /> */}
        <UserAvatar
          height="h-8"
          width="w-8"
          avatarUrl={user.expand?.user.avatarUrl}
        />

        <div className="absolute left-8 top-9">
          {/* {user && (
            <UserStatus status={user.expand!.user.expand.onlineStatus.status!} />
          )} */}
          STATUS
        </div>
      </div>
      <small className=" font-bold text-rose-600">
        {user.expand?.user.username}
      </small>
    </div>
  );
};

export default observer(MembersBar);
