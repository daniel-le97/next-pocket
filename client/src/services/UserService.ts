import { AppState } from "../../AppState";
import {
  Collections,
  ServersResponse,
  UsersResponse,
} from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";

class UserService {
  async updateUser(userData: any) {
    const res = pb.collection("users").update(userData.id, userData);
  }

  async getUsersList() {
    const res = await pb.collection("users").getFullList<UsersResponse>(200);

    AppState.users = res;
    return AppState.users;
  }

  async getUsersByServerId() {
    //testing for now Fancy server : t39a63nklbnlm19
    const res = await pb
      .collection(Collections.Servers)
      .getOne<ServersResponse>("t39a63nklbnlm19", {
        expand: "members",
      });

    AppState.users = res.expand.members;
  }
}
export const userService = new UserService();
