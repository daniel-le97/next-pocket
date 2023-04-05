import { AppState } from "~/AppState";
import {
  Collections,
  FriendRequestRecord,
  FriendRequestResponse,
  FriendRequestStatusOptions,
  FriendsRequest,
} from "~/PocketBaseTypes";
import { pb } from "~/utils/pocketBase";
import { friendsService } from "./FriendsService";
interface FriendsData {
  senderId: string;
  receiverId: string;
  status: "pending" | "accepted" | "declined";
}
class FriendRequestService {
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
      request.status = FriendRequestStatusOptions.accepted;
      const response = await pb
        .collection(Collections.FriendRequest)
        .update<FriendRequestResponse>(id, request);
      if (response.status === "accepted") {
        const newFriendId =
          response.senderId === AppState.user?.id
            ? response.receiverId
            : response.senderId;
        await friendsService.createFriendRecord(newFriendId);
      }
      await pb.collection(Collections.FriendRequest).delete(id);
      return response;
    } else {
      throw new Error("Friend request has already been processed.");
    }
  }

  /**
   * Sends a friend request from the sender to the receiver.
   * @param request - The friend request to send.
   * @returns The newly created friend request object.
   */
  async sendFriendRequest(request: FriendsData) {
    const response = await pb
      .collection(Collections.FriendRequest)
      .create<FriendRequestResponse>(request);
    return response;
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
      request.status = FriendRequestStatusOptions.declined;
      const response = await pb
        .collection(Collections.FriendRequest)
        .delete(id);
      AppState.friendsRequests = AppState.friendsRequests.filter(
        (r) => r.id !== id
      );
      return response;
    } else {
      throw new Error("Friend request has already been processed.");
    }
  }

  /**
   * Fetchs a list of all friend requests through the userId
   * @param senderId - The ID of the sender.
   * @param receiverId - The ID of the receiver.
   */
  async getUserFriendRequests(userFriendId = AppState.userFriendId) {
    const res = await pb
      .collection(Collections.FriendRequest)
      .getFullList<FriendsRequest>(200, {
        filter: `receiver.id = "${userFriendId}" ||  sender.id = "${userFriendId}"`,
        expand: "sender.user,receiver.user",
      });

    AppState.sentRequest = res.filter((r) => r.sender === userFriendId);
    AppState.receivedRequest = res.filter((r) => r.receiver === userFriendId);

    AppState.friendsRequests = res;
    return res;
  }
}
export const friendRequestService = new FriendRequestService();
