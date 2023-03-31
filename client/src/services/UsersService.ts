/* eslint-disable @typescript-eslint/no-misused-promises */
import type { UsersStatusWithUser } from "PocketBaseTypes/utils";
import { addItemOrReplace, filterArray } from "utils/Functions";
import { AppState } from "../../AppState";
import type {
  UsersResponse,
  UsersStatusResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { Collections } from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";
type ACTION = {
  Create: 'Create'
}

class UsersService {
  async updateUser(userData: UsersResponse) {
    // this will update pb.authStore.model automatically
    const res = await pb.collection(Collections.Users).update(userData.id, userData);
    return res;
  }

  async getUsersList() {
    // get all users and set users state
    const res = await pb.collection(Collections.Users).getFullList<UsersResponse>(200);
    // AppState.users = res;
    return AppState.users;
  }
}
export const usersService = new UsersService();
