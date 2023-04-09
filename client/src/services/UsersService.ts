/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppState } from "AppState";
import type { UsersRecord, UsersResponse } from "PocketBaseTypes";
import { Collections } from "PocketBaseTypes";
import { pb } from "utils/pocketBase";
import { boolean } from "zod";
import { friendsService } from "./FriendsService";
import { usersStatusService } from "./UsersStatusService";

type UserValidator = {
  username: string;
  userStatusId: string;
  canAdd: boolean;
  error?: string;
  userId?: string;
}

class UsersService {
  async updateUser(userData: UsersRecord, user = AppState.user) {
    // this will update pb.authStore.model automatically
    if (!user || !userData) return;
    const res = await pb
      .collection(Collections.Users)
      .update<UsersResponse>(user.id, userData);
    return res;
  }

  async getUser(user = AppState.user) {
    if (!user) return;

    return await pb
      .collection(Collections.Users)
      .getOne(user.id, { expand: "currentChannel" });
  }

  async getAll() {
    return await pb.collection(Collections.Users).getFullList<UsersResponse>();
  }

  /**
   * this function checks if the user can add a friend, only sends request after validating client side
   * @date 4/7/2023 - 12:19:31 AM
   *
   * @async
   * @param {string} data
   * @returns {Promise<UserValidator>}
   */
  // async checkIfUserCanAddFriend(data: string): Promise<UserValidator> {
  //   const thisUser = AppState.user;
  //   const response: UserValidator = {
  //     username: "",
  //     userStatusId: "",
  //     canAdd: false,
  //   };
  //   const regex = /^[a-zA-Z0-9]+#[a-zA-Z0-9]{15}$/;
  //   //  first check if there is a user logged in
  //   if (!thisUser) return { ...response, error: "user not logged in" };
  //   //  check if the data has valid character separator
  //   if (!data.includes("#"))
  //     return { ...response, error: "couldn't find # in data" };
  //   if (!regex.test(data))
  //     return {
  //       ...response,
  //       error: "there seems to be an error in your formatting",
  //     };
  //   const [username, userStatusId] = data.split("#");
  //   //  check if the data has valid username and id
  //   if (!username || !userStatusId)
  //     return { ...response, error: "couldn't find username or id in data" };
  //   //  check if the username and id are the same as the current user
  //   if (username == thisUser.username || userStatusId == thisUser.onlineStatus)
  //     return { ...response, error: "you can't add yourself" };
  //   //  check if the user is already friends with this user
  //   const isFriend = AppState.friends?.find(
  //     (f) =>
  //       f.friend?.username == username || f.friend?.onlineStatus == userStatusId
  //   );
  //   if (isFriend)
  //     return { ...response, error: "you are already friends with this user" };
  //   //  check if there is a user with this username and id
  //   const foundUserFromStatus = await usersStatusService.getOne(userStatusId);
  //   const user = foundUserFromStatus?.expand.user;
  //   // check if the supplied username and id are valid , this is the only one that doesn't return an error
  //   if (
  //     user &&
  //     user.username == username &&
  //     user.onlineStatus == userStatusId
  //   ) {
  //     console.log(user);

  //     return { canAdd: true, username, userStatusId, userId: user.id };
  //   }
  //   //  if all else fails return an error
  //   return {
  //     ...response,
  //     error: "there was an unexpected error, please try again later",
  //   };
  // }
  async checkIfUserCanAddFriend(data: string): Promise<UserValidator> {
    const thisUser = AppState.user;
    const response: UserValidator = {
      username: "",
      userStatusId: "",
      canAdd: false,
    };

    // Check if there is a user logged in
    if (!thisUser) {
      return { ...response, error: "user not logged in" };
    }

    // Check if the data has valid character separator
    if (!data.includes("#")) {
      return { ...response, error: "couldn't find # in data" };
    }

    // Check if the data has valid formatting
    const regex = /^[a-zA-Z0-9]+#[a-zA-Z0-9]{15}$/;
    if (!regex.test(data)) {
      return {
        ...response,
        error: "there seems to be an error in your formatting",
      };
    }

    // Extract username and user status id from the data
    const [username, userStatusId] = data.split("#");

    // Check if the data has valid username and id
    if (!username || !userStatusId) {
      return { ...response, error: "couldn't find username or id in data" };
    }

    // Check if the username and id are the same as the current user
    if (
      username == thisUser.username ||
      userStatusId == thisUser.onlineStatus
    ) {
      return { ...response, error: "you can't add yourself" };
    }

    // Check if the user is already friends with this user
    const isFriend = AppState.friends?.find((f) =>
        f.friend?.username == username || f.friend?.onlineStatus == userStatusId
    );
    if (isFriend) {
      return { ...response, error: "you are already friends with this user" };
    }

    // Check if there is a user with this username and id
    const foundUserFromStatus = await usersStatusService.getOne(userStatusId);
    const user = foundUserFromStatus?.expand.user;

    if (
      !user ||
      user.username !== username ||
      user.onlineStatus !== userStatusId
    ) {
      return {
        ...response,
        error: "there was an unexpected error, please try again later",
      };
    }

    return { canAdd: true, username, userStatusId, userId: user.id };
  }

  // async getUserFriendRecord(user=AppState.user){
  //    const userFriendRecord = await pb
  //      .collection(Collections.Friends)
  //      .getFirstListItem(`user =  "${user!.id}"  `);
  //    AppState.userFriendId = userFriendRecord.id;
  // }

  // async setLastChannel(channel = AppState.activeChannel, user = AppState.user) {
  //   const lastChannel = this.getLastChannel();
  //   if (!user || !channel || lastChannel?.id == channel.id) return;
  //   return await this.updateUser({ currentChannel: channel.id }, user);
  // }
}
export const usersService = new UsersService();
