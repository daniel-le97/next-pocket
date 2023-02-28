import { pb } from "../../utils/pocketBase";

class UserService{
async updateUser(userData:any) {
  
 const res = pb.collection('users').update(userData.id,userData)


}

}
export const userService = new UserService()