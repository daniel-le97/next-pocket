/* eslint-disable @typescript-eslint/no-misused-promises */

import { AppState } from "AppState";
import {
  Collections,
  UsersStatusResponse,
  UsersStatusStatusOptions,
  UsersStatusWithUser,
} from "PocketBaseTypes";
import { Friend } from "PocketBaseTypes";
import { addItemOrReplaceV2, filterStateArray } from "utils/Functions";
import { logger } from "utils/Logger";
import { pb } from "~/utils/pocketBase";
import { BaseT } from "./BaseService";
import { friendsService } from "./FriendsService";
import { action } from "mobx";

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
      ({ action: method, record }) => {
        const status = record as unknown as UsersStatusResponse;
        // const friends = AppState.friends?.friends
        action(() => {
          if (!AppState.friends) return;
          const index = AppState.friends.findIndex(
            (f) => f.friend?.id == status.user
          );
          if (!AppState.friends[index]) return;
          // @ts-expect-error it is there
          AppState.friends[index] = {
            ...AppState.friends[index],
            activityStatus: status.status,
          };
        })();
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
    const status = await this.pb.getFullList<UsersStatusWithUser>({
      filter: `id = "${id}"`,
      expand: "user",
    });
    return status[0];
  }

  async setStatusOnline(
    user = AppState.user?.id,
    status: keyof typeof UsersStatusStatusOptions
  ) {
    let userStatus: UsersStatusWithUser;
    if (!user) return;
    const foundStatus = await this.getUserStatus(user);
    if (!foundStatus) return;
    if (foundStatus.status != status) {
      userStatus = await this.pb.update(
        foundStatus.id,
        { user, status: status || "online" },
        { expand: "user" }
      );
    } else userStatus = foundStatus;
    AppState.userStatus = userStatus;
  }
  async create(userId: string) {
    return await this.pb.create({ user: userId, status: "online" });
  }

  /**
   * Description placeholder
   * @date 4/6/2023 - 1:35:30 PM
   *
   * @param {boolean} [unload=false] set this to true if you want to remove the listeners
   * @param {string} user the user to add the listeners to
   */
  handleListeners(unload = false, user: string) {
    // console.log("handling", user);

    const handleVisibilityChange = async (e: Event) => {
      e.preventDefault();
      // @ts-expect-error it is there
      const isPageRefresh =
        performance?.getEntriesByType("navigation")[0]?.type === "reload";
      // const isPage = performance?.getEntriesByType("navigation")[0]?.type
      if (!isPageRefresh) return;
      if (document.hidden) {
        await this.setStatusOnline(user, "away");
      } else {
        await this.setStatusOnline(user, "online");
      }
    };
    const handleBeforeUnload = async (e: Event) => {
      // const userId = pb.authStore.model?.id
      e.preventDefault();
      await this.setStatusOnline(user, "offline");
      // await pb
      //   .collection("tests")
      //   .create({ test: `beforeunload `, user });
    };
    if (unload == true) {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      return;
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);
  }

  async updateCurrentChannel(channelToJoinId: string) {
    const userStatus = await this.getUserStatus();
    await pb.collection(Collections.UsersStatus).update(userStatus.id, {
      currentChannel: channelToJoinId,
    });
  }
}
export const usersStatusService = new UsersStatusService("UsersStatus");
