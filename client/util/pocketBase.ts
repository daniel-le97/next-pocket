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
      SingletonPb.instance = new pocketbase(env.POCKET_URL);
    }
    return SingletonPb.instance;
  }
}

export const pb = SingletonPb.getInstance();
