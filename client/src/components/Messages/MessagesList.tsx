import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { pb } from "../../../utils/pocketBase";
import { BsEmojiSmile, BsPencil, BsXCircle } from "react-icons/bs";
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessageService";
import { Message } from "../../models/Message";
import CreateMessage from "./CreateMessage";
import noMessage from "../../assets/noMessages.png";
import UserStatus from "./UsersStatus";
import { MessagesResponse } from "../../../PocketBaseTypes/pocketbase-types";
// type Record<K extends string | number | symbol, T> = { [P in K]: T };

const Messages = () => {
  const messages = AppState.messages;

  const listRef = useRef(null);
  let unsubscribe: (() => void) | null = null;
const activeChannel = AppState.activeChannel
  const messageQuery = AppState.messageQuery;
  useEffect(() => {
   
    
    const fetchMessages = async () => {
      await messageService.getMessages();
    };
    fetchMessages();

    unsubscribe = async () =>
      await pb
        .collection("messages")
        .subscribe("*", async ({ action, record }) => {
          if (action === "create") {
            const user = await pb.collection("users").getOne(record.user);

            record.expand = { user };

            let updatedMessages: MessagesResponse[] = [...AppState.messages];
            updatedMessages = [
              ...updatedMessages,
              record as unknown as MessagesResponse,
            ];
            AppState.messages = updatedMessages;
          }
          // if (action === "delete") {
          //   setMessages((prevMessages) =>
          //     prevMessages.filter((m) => m.id !== record.id)
          //   );
          // }
        });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return (
    <div className="messages snap-end pb-14" ref={listRef}>
      {messages.length >= 1 ? (
        messages?.map((message, index) => (
          // <div
          //   className={
          //     messageQuery != ""
          //       ? " post-filtered group relative"
          //       : " post  group  relative"
          //   }
          //   key={index}
          // >
          //   <div className="avatar-wrapper relative">
          //     <img
          //       className="avatar"
          //       src={
          //         message.expand.user.avatarUrl ||
          //         `https://api.dicebear.com/5.x/bottts-neutral/svg`
          //       }
          //       alt="avatar"
          //       width="40px"
          //     />
          //     <UserStatus user={message?.expand?.user} />
          //   </div>
          //   <div className="post-content">
          //     <p className="post-owner">
          //       {message.expand?.user?.username}
          //       <small className="timestamp">
          //         {new Date(message.created).toLocaleDateString()}
          //       </small>
          //     </p>
          //     {containsUrl(message.text) ? (
          //       <a
          //         target="_blank"
          //         href={message.text}
          //         className="font-semibold text-blue-500 hover:underline"
          //       >
          //         {message.text}
          //       </a>
          //     ) : (
          //       <p className="post-text">{message.text}</p>
          //     )}
          //   </div>
          //   <div className="absolute bottom-16 right-0 mr-5 ">
          //     {index === messages.length - 1 && (
          //       <div className=" transition-all group-hover:opacity-0  ">
          //         <div className=" relative w-full rounded-lg bg-red-400 px-3 text-sm font-bold text-white">
          //           Newest Message
          //           <hr className=" absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400 " />
          //         </div>
          //       </div>
          //     )}
          //   </div>
          //   <div className="absolute bottom-16 right-0  mr-5   opacity-0 group-hover:opacity-100">
          //     <div className=" post-options">
          //       <div className="group/item relative ">
          //         <BsEmojiSmile size={22} />
          //         <span className=" post-icon-tooltip  ">Like</span>
          //       </div>
          //       <div className="group/item relative">
          //         <BsPencil size={22} />
          //         <span className=" post-icon-tooltip  ">Edit</span>
          //       </div>
          //       <div className="group/item relative">
          //         <BsXCircle size={22} />
          //         <span className=" post-icon-tooltip  ">Remove</span>
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <MessageCard
            messages={messages}
            message={message}
            index={index}
            key={index}
          />
        ))
      ) : (
        <div className=" absolute top-1/3 left-1/2">
          <img src={noMessage.src} alt="" width={400} />
        </div>
      )}

      <CreateMessage />
    </div>
  );
};

export const MessageCard = ({ messages, message, index }) => {
  const messageQuery = AppState.messageQuery;
  return (
    <div
      className={
        messageQuery != ""
          ? " post-filtered group relative"
          : " post  group  relative"
      }
    >
      <div className="avatar-wrapper relative">
        <img
          className="avatar"
          src={
            message.expand.user.avatarUrl ||
            `https://api.dicebear.com/5.x/bottts-neutral/svg`
          }
          alt="avatar"
          width="40px"
        />
        {/* <UserStatus user={message?.expand?.user} /> */}
      </div>
      <div className="post-content">
        <p className="post-owner">
          {message.expand?.user?.username}
          <small className="timestamp">
            {new Date(message.created).toLocaleDateString()}
          </small>
        </p>
        {containsUrl(message.text) ? (
          <a
            target="_blank"
            href={message.text}
            className="font-semibold text-blue-500 hover:underline"
          >
            {message.text}
          </a>
        ) : (
          <p className="post-text">{message.text}</p>
        )}
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
  );
};

function containsUrl(text: any) {
  // Create a regular expression to match URLs
  const urlRegex =
    /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

  // Use the `test` method to check if a URL exists within the text
  return urlRegex.test(text);
}
export default observer(Messages);
