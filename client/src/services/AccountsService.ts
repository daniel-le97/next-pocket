import { pb } from "../../utils/pocketBase";
import type { Account } from "../models/Account";

class  AccountsService {
 async updateAccount(data: Account){
  const id = pb.authStore.model.id
    const account = await pb.collection('users').update(id, data)
    return account
  }
}
export const accountsService = new AccountsService()