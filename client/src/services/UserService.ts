import { AppState } from "../../AppState";
import { UsersResponse } from "../../pocketbase-types";
import { pb } from "../../utils/pocketBase";

class UserService{
async updateUser(userData:any) {
  
 const res = pb.collection('users').update(userData.id,userData)


}

async getUsersList(){
  const res =await  pb.collection('users').getList<UsersResponse>(1,50)
  AppState.users = res.items
  console.log(AppState.users);
  
}
}
export const userService = new UserService()