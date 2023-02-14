import pocketbase from "pocketbase";
import { env } from "../src/env.mjs";
// let pb : pocketbase

class SingletonPb {
  private static instance: pocketbase;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {
    
  }

  static getInstance() {
    if (!SingletonPb.instance) {
      SingletonPb.instance = new pocketbase(env.NEXT_PUBLIC_POCKET_URL);
      SingletonPb.instance.autoCancellation(false)
    }
    return SingletonPb.instance;
  }
}


export const pb = SingletonPb.getInstance();
export const  currentUser = pb.authStore.model
