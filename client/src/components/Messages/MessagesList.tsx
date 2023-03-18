/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { pb } from "../../../utils/pocketBase";
import { AppState } from "../../../AppState";
import CreateMessage from "./CreateMessage";
import noMessage from "../../assets/noMessages.png";
import { MessagesResponse } from "../../../PocketBaseTypes/pocketbase-types";
import MessageCard from "./MessageCard";


const MessageList = () => {
  const messages = AppState.messages;
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const MCRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = async () =>
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
     
        unsubscribe();
      
    };
  }, []);

  const fetchNextPage = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const lastMessage = messages[messages.length - 1];
    const nextPage = await pb.collection("messages").getList(2, 50, {
      expand: "user",
    });
    if (nextPage.items.length > 0) {
      const updatedMessages: MessagesResponse[] = [
        ...messages,
        ...nextPage.items,
      ];
      AppState.messages = updatedMessages;
      setIsLoading(false);
    } else {
      setHasMore(false);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="messages snap-y snap-end  overflow-y-auto  pb-14 "
      ref={MCRef}
    >
      {messages.length >= 1 ? (
        messages?.map((message, index) => (
          <MessageCard
            messages={messages}
            message={message}
            index={index}
            key={index}
          />
        ))
      ) : (
        <div className=" absolute top-1/4 left-1/2">
          <img src={noMessage.src} alt="" width={400} />
        </div>
      )}

      <CreateMessage />
    </div>
  );
};

export default observer(MessageList);
