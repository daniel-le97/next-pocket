import PocketBase from "pocketbase";
import { AppState } from "../AppState";
import { env } from "../src/env.mjs";
// import { logger } from "./Logger.js";

// import { useState, useEffect } from "react";


const pocketbase = new PocketBase(env.NEXT_PUBLIC_POCKET_URL)
pocketbase.autoCancellation(false)
AppState.user = pocketbase.authStore.model
// pBase.authStore.onChange((auth) => {
//   console.log(pBase.authStore.model, "auth");
//   AppState.user = pBase.authStore.model;
// });
export const pb = pocketbase
pb.authStore.onChange((auth) => {
  // console.log(pb.authStore.model, 'auth');
  AppState.user = pb.authStore.model;
  return auth
});






