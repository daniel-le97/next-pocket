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

const DirectMessageContainer = () => {
  const router = useRouter();
  const  id  = router.query.id as string;
  const listRef = useRef(null);
  const user = pb.authStore.model;
  const messages = AppState.directMessages;
   let unsubscribe: (() => void) | null = null;
  

  useEffect(() => {
     if (!user) {
      router.push("/login");
    }

    console.log(id);
    
    const fetchMessages = async () => {
      try {
    

     await directMessageService.getDirectMessages(
          user?.id,
          id?.toString()
        );



      } catch (error) {
        Pop.error(error);
      }
    };

    fetchMessages();

     unsubscribe = async () =>
      await pb
        .collection("directMessages")
        .subscribe("*", async ({ action, record }) => {
          if (action === "create") {
           

            const user = await pb.collection("users").getOne(record.from);

            // Check if record.expand is defined
            if (!record.expand) {
              record.expand = {};
            }

            // Set the from property on record.expand
            record.expand.from =  user ;


           
            
            let updatedMessages: DirectMessagesResponse[] = [
              ...AppState.directMessages,
            ];
            updatedMessages = [
              ...updatedMessages,
              record as unknown as DirectMessagesResponse,
            ];
            AppState.directMessages = updatedMessages;
          }
        });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="content-container" ref={listRef}>
      {messages &&
        messages.map((message, index) => (
          <div className="rounded-md p-1 " key={index}>
            <div className=" post  group  relative">
              <div className="avatar-wrapper relative">
                <img
                  className="avatar"
                  src={
                    message.expand.from.avatarUrl ||
                    `https://api.dicebear.com/5.x/bottts-neutral/svg`
                  }
                  alt="avatar"
                  width="40px"
                />
                {/* <UserStatus user={message?.expand?.from} /> */}
              </div>
              <div className="post-content">
                <p className="post-owner">
                  {message.expand?.from?.username}
                  <small className="timestamp">
                    {new Date(message.created).toLocaleDateString()}
                  </small>
                </p>

                <p className="post-text">{message.text}</p>
              </div>
              <div className="absolute bottom-16 right-0 mr-5 ">
                {index === messages.length - 1 && (
                  <div className=" transition-all group-hover:opacity-0  ">
                    <div className=" relative w-full rounded-lg bg-red-400 px-3 text-sm font-bold text-white">
                      Newest Message
                      <hr className=" absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400 " />
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-16 right-0  mr-5   opacity-0 group-hover:opacity-100">
                <div className=" post-options">
                  <div className="group/item relative ">
                    <BsEmojiSmile size={22} />
                    <span className=" post-icon-tooltip  ">Like</span>
                  </div>
                  <div className="group/item relative">
                    <BsPencil size={22} />
                    <span className=" post-icon-tooltip  ">Edit</span>
                  </div>
                  <div className="group/item relative">
                    <BsXCircle size={22} />
                    <span className=" post-icon-tooltip  ">Remove</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

      <CreateMessage />
    </div>
  );
};
export default observer(DirectMessageContainer);
