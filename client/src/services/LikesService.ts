/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { pb } from "../../utils/pocketBase";
import type { RecordFullListQueryParams } from "pocketbase";
import type {
  LikesWithUser,
  MessageWithUser,
} from "../../PocketBaseTypes/utils";
import { BaseService, IBaseService } from "./BaseService";

import { AppState } from "../../AppState";
import type { LikesRecord } from "../../PocketBaseTypes/pocketbase-types";

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
  async delete(id: string, likeId:string): Promise<void> {
    const res = await this.pb.delete(likeId);

    if (res) {
      const foundMessage = AppState.messages.find(message => message.id == id)
      // if (foundMessage?.expand["likes(message)"]) {
      //   foundMessage.expand["likes(message)"] = foundMessage.expand["likes(message)"].filter(like => like.id != likeId)
      // }
     AppState.messages = AppState.messages.map(message => {
        if (message.id == foundMessage?.id) {
          const found = message.expand["likes(message)"].find(like => like.id == likeId)
          if (found) {
            // console.log(Array.isArray(message.expand["likes(message)"]), message.expand["likes(message)"].length);
            console.log(message.expand["likes(message)"]);
            
            message.expand["likes(message)"] = message.expand["likes(message)"].filter(like => like.id != likeId)
            console.log(message.expand["likes(message)"]);
          }
          
          // message.expand["likes(message)"] = message.expand["likes(message)"].filter(like => like.id != likeId)
        }
        return message
      }) as unknown as MessageWithUser[]
      // console.log(AppState.messages.find(message => message.id == id), foundMessage);
      
      // console.log(AppState.messages);

      // AppState.messages = filtered as unknown as MessageWithUser[];
    }
    return
  }
  async create(id: string): Promise<LikesWithUser | undefined> {
    const alreadyReacted = await this.getOne(id);
    if (alreadyReacted) {
      // console.log(alreadyReacted);

      const likeId = alreadyReacted.id;
      await this.delete(id, likeId);
      console.log("deleted");
      return;
    }
    const data: LikesRecord = {
      message: id,
      user: this.user!.id,
      liked: true,
    };

    const created = await this.pb.create<LikesWithUser>(data, {
      expand: "user",
    });
    // console.log(created);
    // console.log(AppState.messages);

   AppState.messages = AppState.messages.map((message) => {
      if (message.id == id) {
        message.expand["likes(message)"] = [...message.expand["likes(message)"], created]
      }
      return message
    }) as unknown as MessageWithUser[];
    return;
  }
}
export const likesService = new LikesService("Likes");
