import { AppState } from "AppState";
import {
  Collections,
  UsersRecord,
  UsersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
import { Base, BaseService } from "./BaseService";

class AccountsService
  extends Base
  implements BaseService<UsersResponse, UsersRecord>
{
  async getById(id: string): Promise<UsersResponse<unknown>> {
    return this.pb.getOne(id);
  }
  getAll(): Promise<UsersResponse<unknown>[]> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(data: UsersRecord): Promise<void> {
    const updatedUser =  await this.pb.update<UsersResponse>(this.user!.id, data);
  
 AppState.user = updatedUser
  
  }
  async create(
    data: string | UsersRecord
  ): Promise<UsersResponse<unknown> | undefined> {
    throw new Error("Method not implemented.");
  }
}
export const accountsService = new AccountsService("Users");
