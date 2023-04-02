/* eslint-disable @typescript-eslint/no-floating-promises */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import {
  DirectMessagesResponse,
  ServersResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import { useState, useEffect, useRef } from "react";
import { AppState } from "../../../AppState";
import Pop from "../../../utils/Pop";
import { directMessageService } from "../../services/DirectMessagesService";
import { pb } from "../../../utils/pocketBase";
import { BsEmojiSmile, BsPencil, BsXCircle } from "react-icons/bs";
import UserStatus from "../Messages/UsersStatus";
import CreateMessage from "./CreateDirectMessage";
import { FaAt } from "react-icons/fa";
import DirectMessageScroll from "./DirectMessageScroll";

const DirectMessageContainer = () => {
  const router = useRouter();
  const id = router.query.id 

  const user = pb.authStore.model;
  const messages = AppState.directMessages.filter((dm) => dm.id == id);
  const friend = AppState.activeDirectMessage;
  // let unsubscribe: (() => void) | null = null;

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return
    }
  }, []);

  //   if (router.query.id) {
  //     const fetchMessages = async () => {
  //       try {
  //         await directMessageService.getDirectMessages(
  //           user!.id,
  //           id?.toString()
  //         );
  //       } catch (error) {
  //         Pop.error(error);
  //       }
  //     };

  //     fetchMessages();

  //     unsubscribe = async () =>
  //       await pb
  //         .collection("directMessages")
  //         .subscribe("*", async ({ action, record }) => {
  //           if (action === "create") {
  //             const user = await pb.collection("users").getOne(record.from);

  //             // Check if record.expand is defined
  //             if (!record.expand) {
  //               record.expand = {};
  //             }

  //             // Set the from property on record.expand
  //             record.expand.from = user;

  //             let updatedMessages: DirectMessagesResponse[] = [
  //               ...AppState.directMessages,
  //             ];
  //             updatedMessages = [
  //               ...updatedMessages,
  //               record as unknown as DirectMessagesResponse,
  //             ];
  //             AppState.directMessages = updatedMessages;
  //           }
  //         });
  //     return () => {
  //       if (unsubscribe) {
  //         unsubscribe();
  //       }
  //     };
  //   }
  // }, [router.query.id]);

  return (
    <div className="relative h-full flex-1 items-stretch    overflow-hidden bg-gray-300   dark:bg-zinc-700  ">
    {/* <DirectMessageNavigation friend={friend}/> */}
      <DirectMessageScroll />
      <CreateMessage />
    </div>
  );
};




// const DirectMessageNavigation = ({friend}) => {
//   return (
//     <div className=" border-b-2 border-b-zinc-800 bg-zinc-800/90 p-3 shadow-sm">
//       <div className="direct-message-friend flex items-center gap-x-2 text-xl font-bold text-white/80">
//         <FaAt size={22} className="text-white/40" />
//         {friend?.username}
//       </div>
//     </div>
//   );
// }

// export const DirectMessageCard = ({ messages, message, index }) => {
//   return (
//     <div className="rounded-md p-1 " key={index}>
//       <div className=" message group  relative">
//         <div className="avatar-wrapper relative">
//           <img
//             className="avatar"
//             src={
//               message.expand.from.avatarUrl ||
//               `https://api.dicebear.com/5.x/bottts-neutral/svg`
//             }
//             alt="avatar"
//             width="40px"
//           />
//           {/* <UserStatus user={message?.expand?.from} /> */}
//         </div>
//         <div className="message-content">
//           <p className="message-owner">
//             {message.expand?.from?.username}
//             <small className="timestamp">
//               {new Date(message.created).toLocaleDateString()}
//             </small>
//           </p>

//           <p className="message-text">{message.text}</p>
//         </div>
//         <div className="absolute bottom-16 right-0 mr-5 ">
//           {index === messages.length - 1 && (
//             <div className=" transition-all group-hover:opacity-0  ">
//               <div className=" relative w-full rounded-lg bg-red-400 px-3 text-sm font-bold text-white">
//                 Newest Message
//                 <hr className=" absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400 " />
//               </div>
//             </div>
//           )}
//         </div>
//         <div className="absolute bottom-16 right-0  mr-5   opacity-0 group-hover:opacity-100">
//           <div className=" message-options">
//             <div className="group/item relative ">
//               <BsEmojiSmile size={22} />
//               <span className=" message-icon-tooltip  ">Like</span>
//             </div>
//             <div className="group/item relative">
//               <BsPencil size={22} />
//               <span className=" message-icon-tooltip  ">Edit</span>
//             </div>
//             <div className="group/item relative">
//               <BsXCircle size={22} />
//               <span className=" message-icon-tooltip  ">Remove</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
export default observer(DirectMessageContainer);
