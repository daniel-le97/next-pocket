
import type { UsersStatusWithUser } from "PocketBaseTypes";
import { BaseT } from "./BaseService";

class UsersStatusService extends BaseT<UsersStatusWithUser>  {
 update(id: string){
  throw new Error('method not implemented ' + id,)
 }
}
export const usersStatusService = new UsersStatusService('UsersStatus', 'UsersStatus')