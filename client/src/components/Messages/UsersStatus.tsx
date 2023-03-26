/* eslint-disable @typescript-eslint/no-floating-promises */

import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";


import { usersService } from "@/services/UsersService";
import { pb } from "utils/pocketBase";
import type { UsersResponse, UsersStatusResponse } from "PocketBaseTypes/pocketbase-types";
// import * as consola  from "consola";
import consola from 'consola'
// import { userService, usersService } from "../../services/UserService";
export default function UserStatus({ user }: { user: UsersResponse | undefined }) {
  const [isOnline, setIsOnline] = useState(false);
  const [userStatusRecord, setUserStatusRecord] = useState<UsersStatusResponse | null>(null);

  useEffect(() => {
    consola.error(new Error('UserStatus'))
  }, []);

  return (
    <div className="absolute right-0 bottom-0 rounded-full border-4 border-zinc-700 shadow-md shadow-zinc-700 ">
      {isOnline ? (
        <FaCircle color="#22c55e" size={10} />
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
