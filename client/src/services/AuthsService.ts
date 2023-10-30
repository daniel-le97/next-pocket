/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AppState } from "AppState";
import type { NextRouter } from "next/router";
import Pop from "utils/Pop";
import { pb } from "../../utils/pocketBase";
import { usersStatusService } from "./UsersStatusService";
import { friendsService } from "./FriendsService";
import type { UserLogin, UsersResponse } from "~/PocketBaseTypes";
import { getRedirectOrPath } from "../../utils/Redirect";

class AuthsService {
  async resetPassword(email: string) {
    try {
      await pb.collection("users").requestPasswordReset(email);
    } catch (error) {
      console.log(error);
    }
  }
  async isUserLoggedIn(router: NextRouter) {
    const loggedIn = pb.authStore.model;
    if (!loggedIn) {
      await router.push("/login");
    }
  }

  async login(data: UserLogin) {
    const email = data.email;
    const password = data.password;
    await pb.collection("users").authWithPassword(email, password);
    return getRedirectOrPath();
  }
  async signUp(data: UserLogin) {
    try {
      if (data.password != data.passwordConfirm) return "passwords must match";

      const newUser = await pb.collection("users").create<UsersResponse>(data);

      
      await usersStatusService.create(newUser.id);
      return await this.login(data);
    } catch (error) {
      console.log(error);
    }
  }

  signOut() {
    pb.authStore.clear();
    AppState.reset();
  }
}

export const authsService = new AuthsService();
