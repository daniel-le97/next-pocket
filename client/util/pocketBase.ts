import pocketbase from "pocketbase";
import { env } from "../src/env.mjs";

import { useState, useEffect } from "react";

const pBase = new pocketbase(env.NEXT_PUBLIC_POCKET_URL)
pBase.autoCancellation(false)
export const pb = pBase

// export const useCurrentUser = () => {
//   const [currentUser, setCurrentUser] = useState(pb.authStore.model);

//   useEffect(() => {
//     const unsubscribe = pb.authStore.onChange((user) => {
//       console.log("authStore changed", user);
//       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//       // @ts-ignore
//       setCurrentUser(user);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);
// console.log(currentUser)
//   return currentUser;
// };
