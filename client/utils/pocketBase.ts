import pocketbase, { Admin, BaseAuthStore, Record, RecordService } from "pocketbase";
import { AppState } from "../AppState";
import { Collections, UsersRecord } from "../PocketBaseTypes/pocketbase-types";
import { env } from "../src/env.mjs";
// import { logger } from "./Logger.js";

// import { useState, useEffect } from "react";


const pBase = new pocketbase(env.NEXT_PUBLIC_POCKET_URL)
pBase.autoCancellation(false)
AppState.user = pBase.authStore.model
// pBase.authStore.onChange((auth) => {
//   console.log(pBase.authStore.model, "auth");
//   AppState.user = pBase.authStore.model;
// });
export const pb = pBase
pb.authStore.onChange((auth) => {
  // console.log(pb.authStore.model, 'auth');
  AppState.user = pb.authStore.model;
  return auth
});
export  function useUser(){
  const user = pb.authStore.model
 
  if(user){
    return user
  }
}





