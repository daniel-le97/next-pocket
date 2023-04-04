/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppState } from "AppState";
import type { UsersStatusResponse, UsersStatusStatusOptions, UsersStatusWithUser } from "PocketBaseTypes";
import { addItemOrReplaceV2, filterStateArray } from "utils/Functions";
import { logger } from "utils/Logger";
import { pb } from "~/utils/pocketBase";
import { BaseT } from "./BaseService";
import { friendsService } from "./FriendsService";

class UsersStatusService extends BaseT<UsersStatusWithUser> {
  async subscribe() {
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
  async subscribeDM() {
    logger.log("subscribing to UsersStatusService for DM view");
    const subscribe = await this.pb.subscribe(
      "*",
      async ({ action, record }) => {
        const status = record as unknown as UsersStatusResponse;
        // const friends = AppState.friends?.friends
        logger.log({ action, record });
        const isFriend = AppState.friends?.friends?.find(
          (f) => f.id === status.user
        );
        if (!isFriend) return;
        logger.log("status", status.status);
        if (action !== "delete") {
          await friendsService.getUserFriendsList();
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

  async setStatusOnline(user = AppState.user?.id, status: keyof typeof UsersStatusStatusOptions) {
    if (!user) return console.log("no user was supplied");
    const foundStatus = await this.getUserStatus(user);
    if (foundStatus && foundStatus.status != status) {
      await this.pb.update(foundStatus.id, { user, status: status || 'online' });
    }
  }
  async create(userId: string) {
    return await this.pb.create({ user: userId, status: "online" });
  }

  handleListeners(unload = false, user: string) {
    // console.log("handling", user);

    const handleVisibilityChange = async (e: Event) => {
      e.preventDefault()
      // @ts-expect-error it is there
      const isPageRefresh = performance?.getEntriesByType("navigation")[0]?.type === 'reload'
      // const isPage = performance?.getEntriesByType("navigation")[0]?.type
      if(!isPageRefresh) return
      if (document.hidden)   {
       await this.setStatusOnline(user, 'away');
      }else{
        await this.setStatusOnline(user, 'online');
      }
    }
    const handleBeforeUnload = async (e: Event) => {
      // const userId = pb.authStore.model?.id
      e.preventDefault();
      await this.setStatusOnline(user, 'offline');
      // await pb
      //   .collection("tests")
      //   .create({ test: `beforeunload `, user });
    }
    if(unload == true){
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.addEventListener("visibilitychange", handleVisibilityChange)
      return
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("visibilitychange", handleVisibilityChange)
}
}
export const usersStatusService = new UsersStatusService("UsersStatus");
