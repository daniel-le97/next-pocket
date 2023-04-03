/* eslint-disable @typescript-eslint/no-misused-promises */
import { Record } from "pocketbase";
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

  // /**
  //  * Accepts a friend request with the specified ID.
  //  * @param id - The ID of the friend request to accept.
  //  * @returns The updated friend request object with a status of "accepted".
  //  */
  // async acceptFriendRequest(id: string) {
  //   const request = await pb
  //     .collection(Collections.FriendRequest)
  //     .getOne<FriendRequestResponse>(id);
  //   if (request.status === "pending") {
  //     request.status = FriendRequestStatusOptions.accepted
  //     const response = await pb
  //       .collection(Collections.FriendRequest)
  //       .update<FriendRequestResponse>(id, request);
  //     if (response.status === "accepted") {
  //       const newFriendId = response.senderId === AppState.user?.id ? response.receiverId : response.senderId
  //       await this.createFriendRecord(newFriendId);
  //     }
  //     await pb.collection(Collections.FriendRequest).delete(id);
  //     return response;
  //   } else {
  //     throw new Error("Friend request has already been processed.");
  //   }
  // }

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
    const friends = res[0];

    if (friends && friends.user === userId) {
      AppState.friends = new Friends(friends);
      console.log("friends", AppState.friends);
      return new Friends(friends);
    }
  }
}

export const friendsService = new FriendsService();
