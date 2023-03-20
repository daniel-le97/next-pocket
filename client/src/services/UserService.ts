import { AppState } from "../../AppState";
import type {
  UsersResponse,
  UsersStatusResponse} from "../../PocketBaseTypes/pocketbase-types";
import {
  Collections} from "../../PocketBaseTypes/pocketbase-types";
import { pb } from "../../utils/pocketBase";



class UserService {
  async updateUser(userData: UsersResponse) {
    // this will update pb.authStore.model automatically
    const res = await pb.collection("users").update(userData.id, userData);
    return res
  }

  async getUsersList() {
    // get all users and set users state
    const res = await pb.collection("users").getFullList<UsersResponse>(200);
    AppState.users = res;
    return AppState.users;
  }

  // async getUsersByServerId() {
  //   //testing for now Fancy server : t39a63nklbnlm19
  //   const res = await pb
  //     .collection(Collections.Servers)
  //     .getOne<ServersResponse>("t39a63nklbnlm19", {
  //       expand: "members",
  //     });

  //   AppState.users = res.expand.members;
  // }

  async getUserStatus(userId: string){
    // gets a single Users status
    const status = await pb.collection(Collections.UsersStatus).getFirstListItem<UsersStatusResponse>(`user.id = "${userId}"`,{
      expand:'user'
    })
    // console.log(status);
    
    return status
  }
}
export const userService = new UserService();
