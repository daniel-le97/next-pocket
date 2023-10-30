/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { AppState } from "AppState";
import { action, reaction } from "mobx";
import { Collections, type LikesRecord } from "PocketBaseTypes";
import type { LikesWithUser } from "../../PocketBaseTypes/utils";
import { BaseService } from "./BaseService";
import { addItemOrReplaceV2, filterStateArray } from "~/utils/Functions";

class LikesService extends BaseService {
  update(data: LikesRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getById(
    messageId: string,
    collection: "directMessage" | "message"
  ): Promise<LikesWithUser | undefined> {
    const userId = AppState.user!.id;

    const res = await this.pb.getList(1, 1, {
      filter: `${collection} = "${messageId}" && user = "${userId}"`,
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
    return;
  }

  async create(
    id: string,
    collection: "directMessage" | "message"
  ): Promise<LikesWithUser | undefined> {
    const alreadyReacted = await this.getById(id, collection);

    if (alreadyReacted) {
      // If it's already been reacted to delete
      const likeId = alreadyReacted.id;

// console.log(AppState.messages);



      await this.delete(id, likeId);

const message1 = AppState.messages.find((message) => message.id === "tf2gj34udvekq6q");
  
console.log(message1);

      


      return;
    }

    //If it isn't already reacted to Create

    const data: Partial<LikesRecord> = { user: this.user!.id };
    //Determine if this is on a DM or a Server Message
    collection == "message" ? (data.message = id) : (data.directMessage = id);

    await this.pb.create<LikesWithUser>(data, {
      expand: "user",
    });
    console.log("likeService.create()");

    return;
  }

  // async subscribe() {
  //   //  create a subscription to the likes table

  //   const subscribe = await this.pb.subscribe(
  //     "*",
  //     async ({ action, record }) => {
  //       // console.log(action, record);

  //       const _record = record as unknown as LikesWithUser;
  //       const messageIndex = _record.message as unknown as number;

  //       if (action !== "delete") {
  //         const like = await this.getOne(record.id);
  //         this.addLikeOrReplaceToMessage(like, messageIndex);
  //       }
  //       if (action === "delete") {
          
          
  //         const findMessage = AppState.messages.find((message) => {
  //           message.id === _record.message;
  //         });
  //         console.log(findMessage);
          
  //         this.filterLikeFromMessage(_record, messageIndex);
          
       
  //       }
  //     }
  //   );
  //   return subscribe;
  // }

  protected addLikeOrReplaceToMessage(
    like: LikesWithUser,
    likeMessageIndex: number
  ) {
    const likes = AppState.messageLikes[likeMessageIndex];
    const likeIndex = likes?.findIndex((_like) => _like.id == like.id);
    // console.log(likeIndex);

    if (likes && likeIndex) {
      action(() => {
        if (likeIndex == -1) {
          AppState.messageLikes[likeMessageIndex] = [...likes, like];
          return;
        }
        likes[likeIndex] = like;
      })();
    }
  }

  protected filterLikeFromMessage(
    like: LikesWithUser,
    likeMessageIndex: number
  ) {
    action(() => {
      const likes = AppState.messageLikes[likeMessageIndex];
      // console.log('likes',likes);
      // console.log(AppState.messageLikes);
      console.log(likes);
      
      if (likes) {
        const filteredLikes = likes.filter((_like) => _like.id !== like.id);
        AppState.messageLikes[likeMessageIndex] = filteredLikes;
        console.log(AppState.messageLikes[likeMessageIndex]);
        
      }
    })();
  }
}

export const likesService = new LikesService("Likes");
