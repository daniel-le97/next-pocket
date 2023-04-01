/* eslint-disable @typescript-eslint/no-misused-promises */
import PocketBase from "pocketbase";
import { AppState } from "../AppState";
import { env } from "../src/env.mjs";
const pocketbase = new PocketBase(env.NEXT_PUBLIC_POCKET_URL);
pocketbase.autoCancellation(false);
AppState.user = pocketbase.authStore.model;

export const pb = pocketbase;

pb.authStore.onChange((auth) => {
  AppState.user = pb.authStore.model;
  return auth;
});
