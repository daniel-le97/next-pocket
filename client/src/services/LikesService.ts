/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { pb } from "../../utils/pocketBase";
import type { RecordFullListQueryParams } from "pocketbase";
import type {
  LikesWithUser,
  MessageWithUser,
} from "../../PocketBaseTypes/utils";
import type { BaseService } from "./BaseService";
import { Base } from "./BaseService";
import { AppState } from "../../AppState";
import { LikesRecord } from "../../PocketBaseTypes/pocketbase-types";

class LikesService
  extends Base
  implements BaseService<LikesWithUser, LikesRecord>
{
  update(data: LikesRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getOne(messageId: string) {
    const userId = this.user!.id;
   const res =  await this.pb.getList(1, 1, {
      filter: `messageId = "${messageId}" && userId = "${userId}"`,
    });
    return res.items[0]
  }

  async getById(id: string): Promise<LikesWithUser> {
    return this.pb.getOne(id);
  }
  getAll(): Promise<LikesWithUser[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    const res = await this.pb.delete(id);

    if (res) {
      const filtered = AppState.messages.map((message) => {
        message.expand["Likes(messageId)"].filter(
          (reaction) => reaction.id != id
        );
      });
      AppState.messages = filtered as unknown as MessageWithUser[];
    }
    return;
  }
  async create(id: string): Promise<LikesWithUser | undefined> {
    const alreadyReacted = await this.getOne(id);
    if (alreadyReacted) {
      console.log(alreadyReacted);
      
      const id = alreadyReacted.id
      await this.delete(id);
      console.log("deleted");
      return;
    }
    const data: LikesRecord = {
      messageId: id,
      userId: this.user!.id,
      liked: true
    }
    
    const created = await this.pb
    .create<LikesWithUser>(data, {
      expand: "userId",
    });
    // console.log(created);
    console.log(AppState.messages);
    
    AppState.messages.map((message) => {
      if (message.id == id) {
        message.expand["likes(messageId)"]
        .push(created);
      }
    });
    console.log(AppState.messages);
    
    // console.log("created");

    return;
  }
}
export const likesService = new LikesService("Likes");
