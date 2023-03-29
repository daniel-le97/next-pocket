/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { pb } from "../../utils/pocketBase";
import type { RecordFullListQueryParams } from "pocketbase";
import type {
  LikesWithUser,
  MessageWithUser,
} from "../../PocketBaseTypes/utils";
import type { IBaseService } from "./BaseService";
import { BaseService } from "./BaseService";

import { AppState } from "../../AppState";
import type { LikesRecord } from "../../PocketBaseTypes/pocketbase-types";
import { action } from "mobx";
import consola from "consola";

class LikesService
  extends BaseService
  implements IBaseService<LikesWithUser, LikesRecord>
{
  update(data: LikesRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getOne(messageId: string) {
    const userId = this.user!.id;
    const res = await this.pb.getList(1, 1, {
      filter: `message = "${messageId}" && user = "${userId}"`,
    });
    return res.items[0];
  }

  async getById(id: string): Promise<LikesWithUser> {
    return this.pb.getOne(id);
  }
  getAll(): Promise<LikesWithUser[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string, likeId: string): Promise<void> {
    const res = await this.pb.delete(likeId);

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
    const subscribe = await this.pb.subscribe(
      "*",
      async ({ action, record }) => {
        if (action.toString() != "delete") {
       
          console.log('tetusbg');
          
          const like = await this.getById(record.id);
          this.addOrReplace(like, like.message);
        }
        if (action.toString() == "delete") {
          const message = AppState.messages.find((message) =>
            message.expand["likes(message)"].find(
              (like) => like.id == record.id
            )
          );
          this.filter(record as unknown as LikesWithUser, message!.id);
        }
      }
    );
    return subscribe;
  }

  protected addOrReplace(
    like: LikesWithUser,
    messageId: string,
    user = AppState.user
  ) {
    AppState.messages = AppState.messages.map((message) => {
      if (message.id == messageId) {
        message.expand["likes(message)"] = [
          ...message.expand["likes(message)"],
          like,
        ];
      }
      return message;
    });
  }

  protected filter(like: LikesWithUser, messageId: string) {
    AppState.messages = AppState.messages.map((message) => {
      if (message.id != messageId) {
        return message;
      }
      message.expand?.["likes(message)"].filter((_like) => _like.id != like.id);
      return message;
    });
  }
}

export const likesService = new LikesService("Likes");
