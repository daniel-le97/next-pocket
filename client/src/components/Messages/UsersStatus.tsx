/* eslint-disable @typescript-eslint/no-floating-promises */

import { useState, useEffect } from "react";
import { FaCircle, FaCloudMoon, FaMoon } from "react-icons/fa";

import { usersService } from "@/services/UsersService";
import { pb } from "utils/pocketBase";
import type {
  UsersResponse,
  UsersStatusResponse,
  UsersStatusStatusOptions,
} from "PocketBaseTypes/pocketbase-types";
// import * as consola  from "consola";
import consola from "consola";
// import { userService, usersService } from "../../services/UserService";
export default function UserStatus({
  status,
}: {
  status: UsersStatusStatusOptions;
}) {
  const isOnline = status === "online";
  const isAway = status === "away";
  // const isOffline = status === "offline";
  return (
    <div className="absolute right-0 bottom-0 rounded-full border-[3px] border-zinc-800 shadow-md ">
      {isOnline ? (
        <FaCircle color="#22c55e" size={10} />
      ) : isAway ? (
        <FaCircle color="#f0b232" size={10} />
      ) : (
        <FaCircle color="#ef4444" size={10} />
      )}
    </div>
  );
}

//  const getStatus = async () => {
//    try {
//      const res = await pb
//        .collection(Collections.UsersStatus)
//        .getFirstListItem(`userId="${user?.id}"`);

//      setUserStatusRecord(res);

//      setIsOnline(res.isOnline);
//    } catch (error) {
//      if (error.status === 404) {
//        return;
//      }
//      Pop.error(error);
//    }
//  };
//  getStatus();
