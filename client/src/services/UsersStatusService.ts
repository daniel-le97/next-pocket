import { UsersStatusRecord } from "PocketBaseTypes/pocketbase-types";
import { UsersStatusWithUser } from "PocketBaseTypes/utils";
import { BaseT } from "./BaseService";

class UsersStatusService extends BaseT<UsersStatusWithUser>  {
 update(id: string){
  throw new Error('method not implemented ' + id,)
 }
}
export const usersStatusService = new UsersStatusService('UsersStatus', 'UsersStatus')