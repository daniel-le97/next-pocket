/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { pb } from "../../utils/pocketBase";
import type { UserLogin } from "../models/user";

class AuthsService {
  async resetPassword(email: string) {
    try {
      await pb.collection("users").requestPasswordReset(email);
    } catch (error) {
      console.log(error);
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
      await pb.collection("users").create({ email, password, passwordConfirm });
      await this.loginUser(data);
    } catch (error) {}
  }
  async loginUser(data: UserLogin) {
    const email = data.email;
    const password = data.password;
    await pb.collection("users").authWithPassword(email, password);
  }
}

export const authsService = new AuthsService();
