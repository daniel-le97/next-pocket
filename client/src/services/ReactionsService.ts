/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import { pb } from "../../utils/pocketBase";
import type { RecordFullListQueryParams } from "pocketbase";
import type {
  ReactionsRecord,
  ReactionsResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import type {
  MessageWithUser,
  ReactionWithUser,
} from "../../PocketBaseTypes/utils";
import type { BaseService } from "./BaseService";
import { Base } from "./BaseService";
import { AppState } from "../../AppState";

class ReactionsService
  extends Base
  implements BaseService<ReactionWithUser, ReactionsRecord>
{
  update(data: ReactionsRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getOne(messageId: string) {
    const userId = this.user!.id;
   const res =  await this.pb.getList(1, 1, {
      filter: `messageId = "${messageId}" && userId = "${userId}"`,
    });
    return res.items[0]
  }

  async getById(id: string): Promise<ReactionWithUser> {
    return this.pb.getOne(id);
  }
  getAll(): Promise<ReactionWithUser[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    const res = await this.pb.delete(id);

    if (res) {
      const filtered = AppState.messages.map((message) => {
        message.expand["reactions(messageId)"].filter(
          (reaction) => reaction.id != id
        );
      });
      AppState.messages = filtered as unknown as MessageWithUser[];
    }
    return;
  }
  async create(id: string): Promise<ReactionWithUser | undefined> {
    const alreadyReacted = await this.getOne(id);
    if (alreadyReacted) {
      console.log(alreadyReacted);
      
      const id = alreadyReacted.id
      await this.delete(id);
      console.log("deleted");
      return;
    }
    const data: ReactionsRecord = {
      messageId: id,
      userId: this.user!.id,
      reaction: true
    }
    
    const created = await this.pb
    .create<ReactionWithUser>(data, {
      expand: "userId",
    });
    // console.log(created);
    console.log(AppState.messages);
    
    AppState.messages.map((message) => {
      if (message.id == id) {
        message.expand["reactions(messageId)"]
        .push(created);
      }
    });
    console.log(AppState.messages);
    
    // console.log("created");

    return;
  }
}
export const reactionsService = new ReactionsService("Reactions");
