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

class ReactionsService
  extends Base
  implements BaseService<ReactionWithUser, ReactionsRecord>
{
  update(data: ReactionsRecord): Promise<void> {
    throw new Error("Method not implemented.");
  }
  newUpdate(data: ReactionsResponse) {
    console.log(this.user);
  }

  async getById(id: string): Promise<ReactionWithUser> {
    return this.pb.getOne(id);
  }
  getAll(): Promise<ReactionWithUser[]> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<ReactionWithUser> {
    throw new Error("Method not implemented.");
  }
  async create(data: ReactionsRecord): Promise<ReactionWithUser> {
    return await this.pb.create(data, { expand: "user" });
  }
}
export const reactionsService = new ReactionsService("Reactions");
