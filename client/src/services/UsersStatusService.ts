/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppState } from "AppState";
import type { UsersStatusResponse, UsersStatusWithUser } from "PocketBaseTypes";
import { addItemOrReplaceV2, filterStateArray } from "utils/Functions";
import { logger } from "utils/Logger";
import { BaseT } from "./BaseService";

class UsersStatusService extends BaseT<UsersStatusWithUser> {
  async subscribe() {
    logger.log("subscribing to UsersStatusService")
    const subscribe = await this.pb
      .subscribe("*", async ({ action, record }) => {
        if (action !== "delete") {
          const status = await this.getOne(record.id);
          if (status) addItemOrReplaceV2('users', status, "id");
        }else{
          filterStateArray('users', record, 'id')
        }
      })
    return subscribe;
  }

  async getUserStatus(userId = AppState.user?.id as string) {
    // gets a single Users status
    if (!userId) return console.log("no user was supplied");
    const status = await this.pb
      .getFirstListItem<UsersStatusWithUser>(`user.id = "${userId}"`, {
        expand: "user",
      });
    return status;
  }
  async getOne(id: string) {
    return await this.pb.getOne<UsersStatusWithUser>(id, {
      expand: "user",
    });
  }

  async setStatusOnline(user = AppState.user?.id, isOnline = true) {
    if (!user) return console.log("no user was supplied");
    const data = {
      user,
      isOnline
    }
    const status = await this.getUserStatus(user);
    if (status) {
      await this.pb.update(status.id, data );
    } 
  }

 
}
export const usersStatusService = new UsersStatusService('UsersStatus')