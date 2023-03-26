/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import React from "react";
import { useState } from "react";
import { BsEmojiSmile, BsPencil, BsXCircle } from "react-icons/bs";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TimeAgo from "timeago-react";
import { AppState } from "../../../AppState";
import type { MessageWithUser } from "../../../PocketBaseTypes/utils";
import { containsUrl } from "../../../utils/ContainsUrl";
import { getDate } from "../../../utils/helpers";
import Reaction from "../Reactions/Reaction";
import DeleteMessage from "./MessageOptions/DeleteMessage";
import EditMessage from "./MessageOptions/EditMessage";
import LikeMessage from "./MessageOptions/LikeMessage";
import rehypeRaw from "rehype-raw";
import CodeBlock from "../../../utils/CodeBlock";
import { FaThumbsUp } from "react-icons/fa";
import Markdown from "./Markdown";
import Pop from "utils/Pop";
import UserAvatar from "../GlobalComponents/UserAvatar";

const MessageCard = ({
  messages,
  message,
  index,
}: {
  messages: MessageWithUser[];
  message: MessageWithUser;
  index: number;
}) => {
  const [reaction, setReaction] = useState(false);
  const messageQuery = AppState.messageQuery;
  const likes = message.expand["likes(message)"];

  const handleCopyClick = () => {
    function removeBackticks(str: string): string {
      const pattern = /```([\s\S]*)```/;
      const match = pattern.exec(str);
      if (match) {
        return match[1] as string;
      }
      return str;
    }

    navigator.clipboard.writeText(removeBackticks(message.content!));
    Pop.success("Copied To Clipboard");
  };

  return (
    <div
      className={
        messageQuery != "" ? " message-filtered group " : " message    group  "
      }
    >
      <div className="message-user-avatar-status ">
        <UserAvatar
          width="w-12"
          height="h-12"
          avatarUrl={message.expand?.user.avatarUrl}
        />
        {/* <UserStatus user={message?.expand?.user} /> */}
      </div>
      <div className=" message-content      ">
        <p className=" font-bold  text-red-500">
          {message.expand?.user?.username}
          <small className="message-timestamp">
            {
              <TimeAgo
                datetime={message.created}
                locale={"en-US"}
                style={{ margin: 5 }}
              />
            }
          </small>
        </p>

        <ReactMarkdown
          children={message.content as string}
          className="scrollbar-h-sm overflow-x-scroll font-sans text-lg text-zinc-300"
          rehypePlugins={[rehypeRaw]}
          components={{
            code: ({ node, inline, className, children, ...props }) => {
           
              
              if (inline) {
                return <code className="text-zinc-300">{children}</code>;
              }
              return (
                <div className="rounded-t-xl">
                  <div className="  flex justify-between rounded-t-md bg-zinc-900 p-2  ">
                    {/* <span className="language-label">{language}</span> */}
                    <button
                      onClick={handleCopyClick}
                      className="copy-button rounded-lg bg-zinc-700 p-1 px-2 hover:bg-opacity-90 active:bg-indigo-400"
                    >
                      Copy
                    </button>
                  </div>
                  <CodeBlock
                    language={className && className.replace(/language-/, "")}
                    value={children}
                    {...props}
                  />
                </div>
              );
            },
          }}
        />

        {likes && <MessageLikes message={message} />}
      </div>
      {index === 0 && (
        <>
          <div className=" newest-message">
            <div className="newest-message-container">
              Newest Message
              <hr className="  newest-message-line" />
            </div>
          </div>
        </>
      )}
      <div className="message-options">
        <div className="message-options-container">
          {AppState.user?.id == message.user ? (
            <>
              <EditMessage message={message} />
              <DeleteMessage
                messageId={message.id}
                userId={AppState.user?.id}
              />
            </>
          ) : (
            <LikeMessage messageId={message.id} />
          )}
        </div>
      </div>
    </div>
  );
};

const MessageLikes = ({ message }: { message: MessageWithUser }) => {
  const likes = message.expand["likes(message)"];
  return (
    <div className="group/like  relative mt-1 w-16">
      <div className="message-like-container">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1533/1533908.png"
          alt="Thumbs Up Icon"
          className="h-6 w-6 rounded-full"
        />
        {likes.length}
      </div>
      <div className=" message-like-tooltip   ">
        <div className="message-like-tooltip-container">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1533/1533908.png"
            alt="Thumbs Up Icon"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            Thumbs Up By
            <div className="flex flex-col overflow-y-scroll">
              {likes.map((l, index) => (
                <div className="" key={index}>
                  {l.expand.user.username}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(MessageCard);
