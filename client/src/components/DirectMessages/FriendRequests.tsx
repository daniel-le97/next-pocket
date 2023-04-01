/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { AppState } from "AppState";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { FriendRequestResponse, FriendsRequest } from "../../../PocketBaseTypes";
import Pop from "../../../utils/Pop";
import { friendService } from "../../services";

import UserBadge from "../GlobalComponents/UserBadge";

const FriendRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState<
    FriendsRequest[]
  >([]);
  const [sentRequests, setSendRequests] = useState<FriendsRequest[]>([]);
  const user = AppState.user;
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        if (!user) return
        const res = await friendService.getUserFriendRequests(user?.id);
        const receivedRequests = res.filter((r) => r.receiverId === user?.id);
        const sentRequests = res.filter((r) => r.senderId === user?.id);
        setReceivedRequests(receivedRequests);
        setSendRequests(sentRequests);
      } catch (error) {
        Pop.error(error);
      }
    };
    fetchFriendRequests();
  }, []);

   async function handleAccept (friendRequestId: string)  {
    try {
      console.log(friendRequestId, "accept");

      await friendService.acceptFriendRequest(friendRequestId);
  
    } catch (error) {
      Pop.error(error);
    }
  }

   async function handleDecline (friendRequestId: string)  {
    try {
      console.log(friendRequestId, "decline");
      await friendService.declineFriendRequest(friendRequestId);

    } catch (error) {
      Pop.error(error);
    }
  }

  return (
    <>
      <div className="rounded-md p-5">
        <div className="text-lg font-bold text-zinc-200">
          Decline or Accept Friends Requests
        </div>

        <div className="relative flex flex-col py-4">
          <ul className="w-full">
            <div className="my-2 text-xl font-bold text-white">From:</div>
            {receivedRequests.map((f) => (
              <li
                key={f.id}
                className="flex w-full justify-between gap-x-2 rounded-md bg-zinc-800 p-2"
              >
                <div className="flex items-center gap-x-3 text-xl font-bold text-zinc-300">
                  <UserBadge user={f.expand.senderId} />
                  <div className="text-sm">Status: {f.status}</div>
                </div>
                <div className="flex gap-x-2">
                  <button
                    className="btn-primary"
                    onClick={() => handleAccept(f.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="rounded-md bg-purple-500 p-2 font-bold text-zinc-300 hover:bg-opacity-80"
                    onClick={() => handleDecline(f.id)}
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <ul className="w-full">
            <div className="my-2 text-xl font-bold text-white">To:</div>
            {sentRequests.map((f) => (
              <li
                key={f.id}
                className="flex w-full justify-between gap-x-2 rounded-md bg-zinc-800 p-2"
              >
                <div className="flex items-center gap-x-3 text-xl font-bold text-zinc-300">
                  <UserBadge user={f.expand.receiverId} />
                  <div className="text-sm">Status: {f.status}</div>
                </div>
                <div className="flex gap-x-2">
                  <button
                    className="btn-primary"
                    onClick={() => handleAccept(f.id)}
                  >
                    Accept
                  </button>
                  <button
                    className="rounded-md bg-purple-500 p-2 font-bold text-zinc-300 hover:bg-opacity-80"
                    onClick={() => handleDecline(f.id)}
                  >
                    Decline
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default observer(FriendRequests);
