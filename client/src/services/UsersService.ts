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
  async checkIfUserCanAddFriend(data: string) : Promise<UserValidator>{
    const thisUser = AppState.user
    const response : UserValidator = {username: '', userStatusId: '', canAdd: false}
    if (!thisUser) return {...response, error: "user not logged in"}
    if (!data.includes('#')) return {...response, error: "couldn't find # in data"}
    const [username, userStatusId] = data.split('#')
    if (!username || !userStatusId) return {...response, error: "couldn't find username or id in data"}
    if (username == thisUser.username || userStatusId == thisUser.onlineStatus) return {...response, error: "you can't add yourself"}
    const isFriend = AppState.friends?.find(f => f.friend?.username == username || f.friend?.onlineStatus == userStatusId)
    if (isFriend) return {...response, error: "you are already friends with this user"}
    const foundStatus = (await usersStatusService.getOne(userStatusId)).expand.user
    // const thisUserFriends = await friendsService.getUserFriendsList()

    if (foundStatus.username == username && foundStatus.onlineStatus == userStatusId) return { canAdd: true, username, userStatusId}

    return {...response, error: "there was an unexpected error, please try again later"}
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
