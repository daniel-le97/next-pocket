/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppState } from "../../AppState";
import type {
  FriendRequestResponse,
  FriendsRecord,
  FriendsRequest,
  FriendsWithUser,
} from "../../PocketBaseTypes";
import { Collections, Friends } from "../../PocketBaseTypes";
import { pb } from "../../utils/pocketBase";

interface FriendRequest {
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "declined";
}

class FriendService {
  /**
   * Sends a friend request from the sender to the receiver.
   * @param request - The friend request to send.
   * @returns The newly created friend request object.
   */
  async sendFriendRequest(request: FriendRequest) {
    const response = await pb
      .collection(Collections.FriendRequest)
      .create<FriendRequestResponse>(request);
    return response;
  }

  /**
   * Accepts a friend request with the specified ID.
   * @param id - The ID of the friend request to accept.
   * @returns The updated friend request object with a status of "accepted".
   */
  async acceptFriendRequest(id: string) {
    const request = await pb
      .collection(Collections.FriendRequest)
      .getOne<FriendRequestResponse>(id);
    if (request.status === "pending") {
      request.status = "accepted";
      const response = await pb
        .collection(Collections.FriendRequest)
        .update<FriendRequestResponse>(id, request);
      if (response.status === "accepted") {
        const newFriendId = response.senderId === AppState.user?.id ? response.receiverId : response.senderId
        await this.createFriendRecord(newFriendId);
      }
      await pb.collection(Collections.FriendRequest).delete(id);
      return response;
    } else {
      throw new Error("Friend request has already been processed.");
    }
  }

  /**
   * Declines a friend request with the specified ID.
   * @param id - The ID of the friend request to decline.
   * @returns The updated friend request object with a status of "declined".
   */
  async declineFriendRequest(id: string) {
    const request = await pb
      .collection(Collections.FriendRequest)
      .getOne<FriendRequestResponse>(id);
    if (request.status === "pending") {
      request.status = "declined";
      const response = await pb
        .collection(Collections.FriendRequest)
        .delete(id);
      return response;
    } else {
      throw new Error("Friend request has already been processed.");
    }
  }


  async createFriendRecord(friendId: string) {
    const friendsRecord = await this.getUserFriendsList()
    const user = AppState.user?.id
    let data: FriendsRecord 
    if (!user) return
    if (!friendsRecord) {
      data = {user, friends: [friendId]}
      return await pb.collection(Collections.Friends).create(data);
    }
    const friends = friendsRecord.friendIds?.map(f => f)
    friends?.push(friendId)
    data = {user, friends: friends}
    return await pb.collection(Collections.Friends).update(friendsRecord.id, data);
  }

  /**
   * Fetchs a list of all friend requests through the userId
   * @param senderId - The ID of the sender.
   * @param receiverId - The ID of the receiver.
   */
  async getUserFriendRequests(userId = AppState.user?.id) {
    if (!userId) return [];
    const res = await pb
      .collection(Collections.FriendRequest)
      .getFullList<FriendsRequest>(200, {
        filter: `receiverId = "${userId}" ||  senderId = "${userId}"`,
        expand: "senderId,receiverId",
      });
    console.log("friend request", res);
    AppState.sentRequest = res.filter((r) => r.senderId === userId);
    AppState.receivedRequest = res.filter((r) => r.receiverId === userId);

    AppState.friendsRequests = res;
    return res;
  }

  async getUserFriendsList(userId = AppState.user?.id) {
    if (!userId) return 
    const res = await pb
      .collection(Collections.Friends)
      .getFullList<FriendsWithUser>({filter: `user = "${userId}"`, expand: "friends"});
      const friends = res[0];
      if (friends && friends.user === userId) {
        AppState.friends = new Friends(friends);
        return new Friends(friends);
      }
  }


}

export const friendService = new FriendService();
