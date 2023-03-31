/* eslint-disable @typescript-eslint/no-misused-promises */
import PocketBase from "pocketbase";
import { FullUser } from "PocketBaseTypes";
import { AppState } from "../AppState";
import { env } from "../src/env.mjs";
// import { logger } from "./Logger.js";

// import { useState, useEffect } from "react";


const pocketbase = new PocketBase(env.NEXT_PUBLIC_POCKET_URL)
pocketbase.autoCancellation(false)
if (pocketbase.authStore.model) {
  const id = pocketbase.authStore.model.id
  pocketbase.collection("Users").getOne<FullUser>(id, { expand: "currentChannel" })
  .then(user =>AppState.user = user).catch(err => console.log(err))
  
}
// pBase.authStore.onChange((auth) => {
//   console.log(pBase.authStore.model, "auth");
//   AppState.user = pBase.authStore.model;
// });
export const pb = pocketbase
pb.authStore.onChange(async(auth) => {
  const userId = pb.authStore.model?.id
  if (userId) {
    AppState.user = await pb.collection("Users").getOne(userId, {expand: "currentChannel"})
  }
  return auth
});






