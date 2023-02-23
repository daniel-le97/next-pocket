import pocketbase from "pocketbase";
import { AppState } from "../AppState.js";
import { env } from "../src/env.mjs";
// import { logger } from "./Logger.js";

// import { useState, useEffect } from "react";

const pBase = new pocketbase(env.NEXT_PUBLIC_POCKET_URL)
pBase.autoCancellation(false)
AppState.user = pBase.authStore.model
pBase.authStore.onChange((auth) => {
console.log(auth)
AppState.user = pBase.authStore.model
})
export const pb = pBase



