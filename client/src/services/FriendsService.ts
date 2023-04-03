/* eslint-disable @typescript-eslint/no-misused-promises */
import { Record } from "pocketbase";
import { logger } from "~/utils/Logger";
import { AppState } from "../../AppState";
import type {
  FriendRequestResponse,
  FriendsRecord,
  FriendsRequest,
  FriendsResponse,
  FriendsWithUser,
  UsersResponse,
} from "../../PocketBaseTypes";
import { FriendRequestStatusOptions } from "../../PocketBaseTypes";
import { Collections, Friends } from "../../PocketBaseTypes";
import { pb } from "../../utils/pocketBase";

class FriendsService {
  async create(user: UsersResponse) {
    const FriendRecord = await this.getOneByUser(user);
    if (!FriendRecord) {
      const response = await pb
        .collection(Collections.Friends)
        .create<FriendsResponse>({ user: user.id });
      return response;
    }
    if (FriendRecord.user == user.id) {
      return FriendRecord;
    }
    return new Error("unable to create friend record");
  }
  async getOneByUser(user: UsersResponse) {
    const FriendRecord = await pb
      .collection(Collections.Friends)
      .getFullList<FriendsResponse>({ filter: `user = "${user.id}"` });
    return FriendRecord[0];
  }

  async createFriendRecord(friendId: string) {
    const friendsRecord = await this.getUserFriendsList();
    const user = AppState.user?.id;
    let data: FriendsRecord;
    if (!user) return;
    if (!friendsRecord) {
      data = { user, friends: [friendId] };
      return await pb.collection(Collections.Friends).create(data);
    }
    const friends = friendsRecord.friendIds?.map((f) => f);
    friends?.push(friendId);
    data = { user, friends: friends };
    return await pb
      .collection(Collections.Friends)
      .update(friendsRecord.id, data);
  }

  async getUserFriendsList(userId = AppState.user?.id) {
    if (!userId) return;
    const res = await pb
      .collection(Collections.Friends)
      .getFullList<FriendsWithUser>({
        filter: `user = "${userId}"`,
        expand: "friends.onlineStatus",
      });
    const unformattedFriendsRecord = res[0];

    if (unformattedFriendsRecord && unformattedFriendsRecord.user === userId) {
      const friends = new Friends(unformattedFriendsRecord);
      AppState.friends = friends;
      // console.log("friends", AppState.friends);
      return friends;
    }
  }

  async subscribe() {
    logger.log("friendsService.subscribe()");
    const subscribe = await pb
      .collection(Collections.Friends)
      .subscribe("*", async ({ action, record }) => {
        const Record = record as unknown as FriendsResponse
        if (Record.user != AppState.user?.id) return
        if (action !== "delete") {
          await this.getUserFriendsList();
        }
        if (action === "delete") {
          logger.error('you probably deleted all your friends by accident')
        }
      });
    return subscribe;
  }
}

export const friendsService = new FriendsService();
