import { AppState } from "~/AppState";
import type { FriendRequestResponse, FriendsRequest } from "~/PocketBaseTypes";
import {
  Collections,
  FriendRequestRecord,
  FriendRequestStatusOptions,
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
    // Get the friend request by ID
    const request = await pb
      .collection(Collections.FriendRequest)
      .getOne<FriendRequestResponse>(id);

    // If the status of the request is pending, update the status to accepted
    if (request.status === "pending") {
      request.status = FriendRequestStatusOptions.accepted;

      // Update the friend request in the database and expand the sender and receiver user fields
      const response = await pb
        .collection(Collections.FriendRequest)
        .update<FriendRequestResponse>(id, request, {
          expand: "sender.user,receiver.user",
        });

      // Update the received friend requests in the app state by replacing the old request with the updated response
      AppState.receivedRequest = AppState.receivedRequest.map((r) =>
        r.id === id ? response : r
      );

      // Get the user's friend record from the database
      const FriendRecord = await pb
        .collection(Collections.Friends)
        .getOne(AppState.userFriendId);

      if (FriendRecord) {
        // Add the sender to the user's list of friends
        const data = {
          user: FriendRecord.user,
          friends: [
            ...FriendRecord.friends,
            response.expand.sender.expand.user.id,
          ],
        };

        // Update the user's friend record in the database and expand the user field
        const updatedFriendRecord = await pb
          .collection(Collections.Friends)
          .update(AppState.userFriendId, data, {
            expand: "user",
          });

        await pb.collection(Collections.FriendRequest).delete(response.id);
        AppState.friendsRequests = AppState.friendsRequests.filter(
          (r) => r.id !== id
        );
        AppState.sentRequest = AppState.sentRequest.filter((r) => r.id !== id);
        AppState.receivedRequest = AppState.receivedRequest.filter(
          (r) => r.id !== id
        );

      
      }

      // Return the updated friend request response
      return response;
    } else {
      // If the status of the request is not pending, throw an error
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
      AppState.sentRequest = AppState.sentRequest.filter((r) => r.id !== id);
      AppState.receivedRequest = AppState.receivedRequest.filter(
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
  async getUserFriendRequests(usersFriendId = AppState.friends?.id) {
    if (!usersFriendId) return [];
    // console.log("fr", usersFriendId)

    const res = await pb
      .collection(Collections.FriendRequest)
      .getFullList<FriendsRequest>(200, {
        filter: `receiver = "${usersFriendId}" ||  sender = "${usersFriendId}"`,
        expand: "sender.user,receiver.user",
      });
    console.log("friend request", res);

    AppState.sentRequest = res.filter((r) => r.sender === usersFriendId);
    AppState.receivedRequest = res.filter((r) => r.receiver === usersFriendId);

    AppState.friendsRequests = res;
    return res;
  }
}
export const friendRequestService = new FriendRequestService();
