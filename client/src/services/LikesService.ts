// import { pb } from "../../utils/pocketBase";
import { ListQueryParams, RecordFullListQueryParams, RecordService } from "pocketbase";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { MessageWithUser } from "../../PocketBaseTypes/utils";

import { pb } from "../../utils/pocketBase";
import { Base, BaseService } from "./BaseService";

class  LikesService extends Base implements BaseService<MessageWithUser>{
  getById(): Promise<MessageWithUser> {
    throw new Error("Method not implemented.");
  }
 async getAll(): Promise<MessageWithUser[]> {
    const query: RecordFullListQueryParams = {
    sort: '-created',
    
    }
    return await this.pb.getFullList<MessageWithUser>(query)
  }
  delete(): Promise<MessageWithUser> {
    throw new Error("Method not implemented.");
  }
  update(): Promise<MessageWithUser> {
    throw new Error("Method not implemented.");
  }
  create(): Promise<MessageWithUser> {
    throw new Error("Method not implemented.");
  }
 
}
export const likesService = new LikesService('Servers')