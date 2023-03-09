import { UsersResponse } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
import type { Account } from "../models/Account";

class  AccountsService {
 async updateAccount(data:UsersResponse){

    const account = await pb.collection('users').update(data.id, data)
    return account
  }


  async getFriendsList(){

  }
}
export const accountsService = new AccountsService()