/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { AppState } from "AppState";
import type { UsersRecord, UsersResponse } from "PocketBaseTypes";
import { Collections } from "PocketBaseTypes";
import { pb } from "utils/pocketBase";

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
  async getUserFriendRecord(user=AppState.user){
     const userFriendRecord = await pb
       .collection(Collections.Friends)
       .getFirstListItem(`user =  " ${user?.id}"  `);
     AppState.userFriendId = userFriendRecord.id;
  }

  // async setLastChannel(channel = AppState.activeChannel, user = AppState.user) {
  //   const lastChannel = this.getLastChannel();
  //   if (!user || !channel || lastChannel?.id == channel.id) return;
  //   return await this.updateUser({ currentChannel: channel.id }, user);
  // }
}
export const usersService = new UsersService();
