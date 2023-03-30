/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AppState } from "AppState";
import { action } from "mobx";
import type { LikesRecord } from "PocketBaseTypes";
import { logger } from "utils/Logger";
import type {
  LikesWithUser,
  MessageWithUser,
} from "../../PocketBaseTypes/utils";
import type { IBaseService } from "./BaseService";
import { BaseService } from "./BaseService";

class LikesService
  extends BaseService
  implements IBaseService<LikesWithUser, LikesRecord>
{
  update(data: LikesRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getById(messageId: string) {
    const userId = this.user!.id;
    const res = await this.pb.getList(1, 1, {
      filter: `message = "${messageId}" && user = "${userId}"`,
    });
    return res.items[0] as unknown as LikesWithUser;
  }

  async getOne(id: string): Promise<LikesWithUser> {
    return this.pb.getOne(id, { expand: "user" });
  }
  getAll(): Promise<LikesWithUser[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string, likeId: string): Promise<void> {
    const res = await this.pb.delete(likeId);
    console.log("likeService.delete()");

    // if (res) {
    //   const foundMessage = AppState.messages.find(
    //     (message) => message.id == id
    //   );
    //   let likes = foundMessage?.expand["likes(message)"];
    //   if (likes) {
    //     likes = likes.filter((like) => like.id != likeId);
    //   }
    //   //  AppState.messages = AppState.messages.map(message => {
    //   //     if (message.id == foundMessage?.id) {
    //   //       const found = message.expand["likes(message)"].find(like => like.id == likeId)
    //   //       if (found) {
    //   //         console.log(message.expand["likes(message)"]);
    //   //         message.expand["likes(message)"] = message.expand["likes(message)"].filter(like => like.id != likeId)
    //   //         console.log(message.expand["likes(message)"]);
    //   //       }
    //   //     }
    //   //     return message
    //   //   }) as unknown as MessageWithUser[]
    // }
    return;
  }
  async create(id: string): Promise<LikesWithUser | undefined> {
    // console.log("creating");
    const alreadyReacted = await this.getOne(id);
    if (alreadyReacted) {
      // console.log(alreadyReacted);

      const likeId = alreadyReacted.id;
      await this.delete(id, likeId);
      // console.log("deleted");
      return;
    }
    const data: LikesRecord = {
      message: id,
      user: this.user!.id,
    };

    await this.pb.create<LikesWithUser>(data, {
      expand: "user",
    });
    console.log("likeService.create()");
    // console.log(created);
    // console.log(AppState.messages);

    // const messageToUpdate = AppState.messages.find(
    //   (message) => message.id === id
    // );
    // if (messageToUpdate) {
    //   messageToUpdate.expand["likes(message)"].push(created);
    // }

    // AppState.messages = AppState.messages.map((message) => {
    //   if (message.id == id) {
    //     message.expand["likes(message)"] = [
    //       ...message.expand["likes(message)"],
    //       created,
    //     ];
    //   }
    //   return message;
    // }) as unknown as MessageWithUser[];
    return;
  }
  async subscribe() {
    logger.log("likeService.subscribe()");
    const subscribe = await this.pb.subscribe(
      "*",
      async ({ action, record }) => {
        const index = AppState.messages.findIndex((message) => message.id == record.message);
        if (index == -1) {
          logger.log("likeService.subscribe() message not found", record.message)
          return
        }
        const _record = record as unknown as LikesWithUser;
        if (action !== "delete") {
          const like = await this.getOne(record.id);
          this.addLikeOrReplaceToMessage(like, index);
          console.log("likeService.subscribe(create)", like);
        }
        if (action === "delete") {
          this.filterLikeFromMessage(_record, index)
          console.log("likeService.subscribe(delete)", _record);
        }
      }
    );
    return subscribe;
  }

  protected addLikeOrReplaceToMessage(like: LikesWithUser,messageIndex: number,) {
    const likes = AppState.messageLikes[messageIndex];
    const likeIndex = likes?.findIndex((_like) => _like.id == like.id);
    if (likes && likeIndex != undefined) {
      action(()=> {
        if (likeIndex == -1) {
          AppState.messageLikes[messageIndex] = [...likes, like]
          return
        }
        likes[likeIndex] = like;
      })()
  }
}

  protected filterLikeFromMessage(like: LikesWithUser, messageIndex: number) {
    const likes = AppState.messageLikes[messageIndex];
    if (likes) {
      action(() => {
        AppState.messageLikes[messageIndex] = likes.filter(
          (_like) => _like.id != like.id
        );
      })();
    }
  }
}

export const likesService = new LikesService("Likes");
