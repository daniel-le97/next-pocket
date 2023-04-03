/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppState } from "AppState";
import type { UsersStatusResponse, UsersStatusWithUser } from "PocketBaseTypes";
import { addItemOrReplaceV2, filterStateArray } from "utils/Functions";
import { logger } from "utils/Logger";
import { BaseT } from "./BaseService";
import { friendsService } from "./FriendsService";

class UsersStatusService extends BaseT<UsersStatusWithUser> {
  async subscribe(){
    logger.log("subscribing to UsersStatusService");
    const subscribe = await this.pb.subscribe(
      "*",
      async ({ action, record }) => {
        if (action !== "delete") {
          const status = await this.getOne(record.id);
          if (status) addItemOrReplaceV2("users", status, "id");
        } else {
          filterStateArray("users", record, "id");
        }
      }
    );
    return subscribe;
  }
  async subscribeDM(){
    logger.log("subscribing to UsersStatusService for DM view");
    const subscribe = await this.pb.subscribe(
      "*",
      async ({ action, record }) => {
        const status = record as unknown as UsersStatusResponse
        // const friends = AppState.friends?.friends
        logger.log({action, record})
        const isFriend = AppState.friends?.friends?.find(f => f.id === status.user)
        if(!isFriend) return
        logger.log("status", status.isOnline)
        if (action !== "delete") {
          await friendsService.getUserFriendsList()
        } else {
          filterStateArray("users", record, "id");
        }
      }
    );
    return subscribe;
  }

  async getUserStatus(userId = AppState.user?.id as string) {
    // gets a single Users status
    if (!userId) return console.log("no user was supplied");
    const status = await this.pb.getFirstListItem<UsersStatusWithUser>(
      `user.id = "${userId}"`,
      {
        expand: "user",
      }
    );
    return status;
  }
  async getOne(id: string) {
    return await this.pb.getOne<UsersStatusWithUser>(id, {
      expand: "user",
    });
  }

  async setStatusOnline(user = AppState.user?.id, isOnline = true) {
    if (!user) return console.log("no user was supplied");
    const status = await this.getUserStatus(user);
    if (status && status.isOnline != isOnline) {
      await this.pb.update(status.id, { user, isOnline });
    }
  }
  async create(userId: string) {
    return await this.pb.create({ user: userId, isOnline: true });
  }
}
export const usersStatusService = new UsersStatusService("UsersStatus");
