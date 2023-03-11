import { AppState } from "../../AppState";
import {
  Collections,
  FriendRequestResponse,
} from "../../PocketBaseTypes/pocketbase-types";
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
        await this.createFriendRecord(request.senderId, request.receiverId);
      }
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
        .delete(id)
      return response;
    } else {
      throw new Error("Friend request has already been processed.");
    }
  }

  /**
   * Creates a new friend record between the sender and receiver.
   * @param senderId - The ID of the sender.
   * @param receiverId - The ID of the receiver.
   */
  async createFriendRecord(
    senderId: string,
    receiverId: string
  ) {
    const data = {
      user:receiverId,
      friends:senderId
    }
  const res = await pb.collection(Collections.Friends).create(data)
  return res
  }

  /**
   * Fetchs a list of all friend requests through the userId
   * @param senderId - The ID of the sender.
   * @param receiverId - The ID of the receiver.
   */
  async getUserFriendRequests(userId: string) {
    const res = await pb
      .collection(Collections.FriendRequest)
      .getFullList<FriendRequestResponse>(200, {
        filter: `receiverId = "${userId}"`,
        expand:'senderId,receiverId'
      });
      // AppState.friendRequests = res
      return res
  }

  async getUserFriendsList(userId:string){
    const res=  await pb.collection( Collections.Friends).getFirstListItem(`user="${userId}"`,{

      expand:'friends'
    })



    return res
    
  }
}

export const friendService = new FriendService();
