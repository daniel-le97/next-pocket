import type { UsersResponse } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";

class  AccountsService {
 async updateAccount(data:UsersResponse){
    const account = await pb
    .collection('users')
    .update(data.id, data)
    return account
  }

}
export const accountsService = new AccountsService()