/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { friendRequestService } from "@/services/FriendRequestsService";
import { AppState } from "AppState";
import { observer } from "mobx-react";
import { useEffect } from "react";
import Pop from "../../../utils/Pop";
import UserBadge from "../GlobalComponents/UserBadge";
import TimeAgo from "timeago-react";
import { UsersResponse } from "PocketBaseTypes";

const FriendRequests = () => {
  const sentRequests = AppState.friends?.filter(f => f.status === "pending" && f.requester?.id == AppState.user?.id  ) || []
  const receivedRequests = AppState.friends?.filter(f => f.status === "pending" && f.requester?.id != AppState.user?.id) || []

  useEffect(() => {
    if (AppState.userFriendId) {
      (async () => {
        try {
          await friendRequestService.getUserFriendRequests();
        } catch (error) {
          Pop.error(error);
        }
      })();
    }
  }, [AppState.userFriendId]);

  async function handleAccept(friendRequestId: string) {
    try {
      await friendRequestService.acceptFriendRequest(friendRequestId);
    } catch (error) {
      Pop.error(error);
    }
  }

  async function handleDecline(friendRequestId: string) {
    try {
      await friendRequestService.declineFriendRequest(friendRequestId);
    } catch (error) {
      Pop.error(error);
    }
  }

  return (
    <div className="rounded-md p-5">
      <div className="text-lg font-bold text-zinc-200">
        Decline or Accept Friends Requests
      </div>

      <div className="relative flex flex-col py-4 ">
        <ul className="mb-5 w-full">
          <div className="my-2 text-xl font-bold text-white">Received:</div>

          {receivedRequests.length ? (
            receivedRequests.map((f) => (
              <li
                key={f.id}
                className="flex w-full justify-between gap-x-2 rounded-md bg-zinc-800 p-2 m-3"
              >
                <div className="flex items-center gap-x-3 text-xl font-bold text-zinc-300">
                  <UserBadge user={f.friend as UsersResponse} />
                  <div className="flex items-center justify-between text-sm">
                    Status: {f.status}
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  {
                    <TimeAgo
                      datetime={f.created}
                      locale={"en-US"}
                      style={{ margin: 5 }}
                    />
                  }
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
            ))
          ) : (
            <div className="text-xl font-bold text-zinc-200">
              No Friend Requests received
            </div>
          )}
        </ul>
        <ul className="w-full">
          <div className="my-2 text-xl font-bold text-white">Sent:</div>
          {sentRequests.length ? (
            sentRequests.map((f) => (
              <li
                key={f.id}
                className="flex w-full justify-between gap-x-2 rounded-md bg-zinc-800 p-2 m-3"
              >
                <div className="flex items-center gap-x-3 text-xl font-bold text-zinc-300">
                  <UserBadge user={f.friend as UsersResponse} />

                  <div className="text-sm">Status: {f.status}</div>
                </div>
                 <div className="flex items-center text-sm text-gray-300">
                  {
                    <TimeAgo
                      datetime={f.created}
                      locale={"en-US"}
                      style={{ margin: 5 }}
                    />
                  }
                </div>
                <div className="flex gap-x-2">
                  <button
                    className="rounded-md bg-purple-500 p-2 font-bold text-zinc-300 hover:bg-opacity-80"
                    onClick={() => handleDecline(f.id)}
                  >
                    Cancel
                  </button>
                </div>
              </li>
            ))
          ) : (
            <div className="text-xl font-bold text-zinc-200">
              No Friend Requests sent
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default observer(FriendRequests);
