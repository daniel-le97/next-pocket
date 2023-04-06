/* eslint-disable @typescript-eslint/no-misused-promises */
import { Record } from "pocketbase";
import { logger } from "~/utils/Logger";
import { AppState } from "../../AppState";
import {
  Friend,
  FriendsRecord,
  FriendsRequest,
  FriendsResponse,
  FriendsWithUser,
  UsersResponse,
} from "../../PocketBaseTypes";

import { Collections} from "../../PocketBaseTypes";
import { pb } from "../../utils/pocketBase";

class FriendsService {
  async create(friendUserId: string) {
    const userId = AppState.user?.id;
    if (!userId || friendUserId) return;

    const initalCreateRecord = {
      status: "pending",
      friends: [userId, friendUserId],
    };
    const response = await pb
      .collection(Collections.Friends)
      .create<FriendsResponse>(initalCreateRecord);
    return response;
  }
  async delete(friendId: string) {
    return await pb.collection(Collections.Friends).delete(friendId);
  }
  async getOneByUser(user: string) {
    const FriendRecord = await pb
      .collection(Collections.Friends)
      .getFullList<FriendsResponse>({ filter: `friends.id ~ "${user}"` });
    return FriendRecord[0];
  }

  // async createFriendRecord(friendId: string) {
  //   const friendsRecord = await this.getUserFriendsList();
  //   const user = AppState.user?.id;
  //   let data: FriendsRecord;
  //   if (!user) return;
  //   if (!friendsRecord) {
  //     data = { user, friends: [friendId] };
  //     return await pb.collection(Collections.Friends).create<FriendsResponse>(data);
  //   }
  //   const friends = friendsRecord.friendIds?.map((f) => f);
  //   friends?.push(friendId);
  //   data = { user, friends: friends };
  //   return await pb
  //     .collection(Collections.Friends)
  //     .update<FriendsResponse>(friendsRecord.id, data);
  // }

  async getUserFriendsList(userId = AppState.user?.id) {
    if (!userId) return;
    // console.log(`filter: friends ?~ "${userId}"`);
    const res = await pb
      .collection(Collections.Friends)
      .getFullList<FriendsWithUser>({ filter: `friends ?~ "${userId}"`, expand: 'friends.onlineStatus' });
    console.log("friends", res);
    AppState.friends = res.map((f) => new Friend(f, userId));
    // const unformattedFriendsRecord = res[0];

    // if (unformattedFriendsRecord && unformattedFriendsRecord.friends.includes(userId)) {
    //   const friends = new Friends(unformattedFriendsRecord);
    //   AppState.friends = friends;
    //   // console.log("friends", AppState.friends);
    //   return friends;
    // }
  }

  async subscribe() {
    logger.log("friendsService.subscribe()");
    const subscribe = await pb
      .collection(Collections.Friends)
      .subscribe("*", async ({ action, record }) => {
        const Record = record as unknown as FriendsResponse;
        if (!Record.friends.includes(AppState.user!.id)) return;
        if (action !== "delete") {
          await this.getUserFriendsList();
        }
        if (action === "delete") {
          logger.error("you probably deleted all your friends by accident");
        }
      });
    return subscribe;
  }
}

export const friendsService = new FriendsService();
