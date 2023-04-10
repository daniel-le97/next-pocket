/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { pb } from "../../../utils/pocketBase";
import { AppState } from "../../../AppState";
import CreateMessage from "../CreateMessage/CreateMessage";
import noMessage from "../../assets/noMessages.png";
import type { MessagesResponse } from "../../../PocketBaseTypes/pocketbase-types";
import MessageCard from "./MessageCard";
import type { MessageWithUser } from "../../../PocketBaseTypes/utils";
import { messageService } from "@/services/MessagesService";

const MessageList = () => {
  const messages = AppState.messages;
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const MCRef = useRef<HTMLDivElement>(null);
  // const unsubscribe = async () => {
  //   const subscribe = await pb
  //     .collection("messages")
  //     .subscribe("*", ({ action, record }) => {
  //      messageService.filterSubscribe(action, record)})
  //   return subscribe;
  // };

  useEffect(() => {
    messageService.filterSubscribe();
    return messageService.filterSubscribe() as unknown as void;
  }, []);

  return (
    <div
      className="messages snap-y snap-end  overflow-y-auto  pb-14 "
      ref={MCRef}
    >
      {messages ? (
        messages?.map((message, index) => (
          <MessageCard
            messages={messages}
            message={message}
            index={index}
            key={index}
          />
        ))
      ) : (
        <div className=" absolute left-1/2 top-1/4">
          <img src={noMessage.src} alt="" width={400} />
        </div>
      )}

      <CreateMessage />
    </div>
  );
};

export default observer(MessageList);
