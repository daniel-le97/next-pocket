import { AppState } from "AppState";
import { UsersRecord, UsersResponse } from "PocketBaseTypes";
import { BaseService, IBaseService } from "./BaseService";


class AccountsService
  extends BaseService
  implements IBaseService<UsersResponse, UsersRecord>
{
  async getById(id: string): Promise<UsersResponse<unknown>> {
    return this.pb.getOne(id);
  }
  getAll(): Promise<UsersResponse<unknown>[]> {
    throw new Error("Method not implemented.");
  }
   delete(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async update(data: UsersRecord): Promise<void> {
    const updatedUser =  await this.pb.update(this.user!.id, data);
  console.log(updatedUser);
  
 AppState.user = updatedUser
  
  }
  create(
    data: string | UsersRecord
  ): Promise<UsersResponse<unknown> | undefined> {
    throw new Error("Method not implemented.");
  }
}
export const accountsService = new AccountsService("Users");
