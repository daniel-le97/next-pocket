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

  async subscribeToStatus() {
    const subscribe = await pb
      .collection(Collections.UsersStatus)
      .subscribe<UsersStatusResponse>("*", async ({ action, record }) => {
        if (action != "Delete") {
          const status = await this.getUserStatus(record.user);
          addItemOrReplace(AppState.users, status, "id");
          return;
        }

        await this.deleteStatus(record.id, true);
      });
    return subscribe;
    
  }

  async getUserStatus(userId: string) {
    // gets a single Users status
    const status = await pb
      .collection(Collections.UsersStatus)
      .getFirstListItem<UsersStatusWithUser>(`user.id = "${userId}"`, {
        expand: "user",
      });
    // console.log(status);

    return status;
  }
  async deleteStatus(id: string, skipCall = false) {
    filterArray(AppState.users, id, 'id')
    // only invoke this when needed otherwise just filter AppState and proceed
    if (!skipCall) {
      await pb.collection(Collections.UsersStatus).delete(id);
    }
  }
}
export const usersService = new UsersService();
