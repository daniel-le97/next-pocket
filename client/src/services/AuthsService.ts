/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppState } from "AppState";
import type { NextRouter} from "next/router";
import Pop from "utils/Pop";
import { pb } from "../../utils/pocketBase";
import { usersStatusService} from "./UsersStatusService";
import { friendsService } from "./FriendsService";
import { UsersResponse } from "~/PocketBaseTypes";

type UserLogin = {
  email: string;
  password: string;
  passwordConfirm?: string;
}

class AuthsService {
  async resetPassword(email: string) {
    try {
      await pb.collection("users").requestPasswordReset(email);
    } catch (error) {
      console.log(error);
    }
  }
  async isUserLoggedIn(router: NextRouter){
    const loggedIn = pb.authStore.model
    if (!loggedIn) {
      await router.push('/login')
    }
  }

  async login(data: UserLogin) {
    const email = data.email;
    const password = data.password;
    await pb.collection("users").authWithPassword(email, password);
    console.log(pb.authStore.model);
  }
  async signUp(data: UserLogin) {
    const email = data.email;
    const password = data.password;
    const passwordConfirm = data.passwordConfirm;
    if (password != passwordConfirm) return "passwords must match";

    try {
      const newUser = await pb.collection("users").create({ email, password, passwordConfirm });
      await usersStatusService.create(newUser.id)
      const user = newUser as unknown as UsersResponse
      await friendsService.create(user)
      await this.loginUser(data);
    } catch (error) {
      Pop.error('unable to process signup and login request')
    }
  }
  async loginUser(data: UserLogin) {
    const email = data.email;
    const password = data.password;
    await pb.collection("users").authWithPassword(email, password);
  }
   signOut(){
    pb.authStore.clear()
    AppState.reset()
    
  }
}

export const authsService = new AuthsService();
