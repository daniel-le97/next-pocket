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
    navigator.clipboard.writeText(message.content);
    Pop.success('Copied To Clipboard')
  };

  return (
    <div
      className={
        messageQuery != "" ? " message-filtered group " : " message    group  "
      }
    >
      <div className="relative  ml-auto mb-auto flex  flex-col items-center ">
        <img
          className="mx-0  mb-auto mt-0 h-12 w-12  cursor-pointer rounded-full bg-gray-100 object-cover object-top shadow-md shadow-zinc-500 dark:shadow-zinc-800"
          src={
            message.expand?.user.avatarUrl ||
            `https://api.dicebear.com/5.x/bottts-neutral/svg`
          }
          alt="avatar"
        />
        {/* <UserStatus user={message?.expand?.user} /> */}
      </div>
      <div className="  ml-auto flex w-4/5 flex-col justify-start      ">
        <p className=" font-bold  text-red-500">
          {message.expand?.user?.username}
          <small className="ml-3 font-normal text-black dark:text-gray-300">
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
      <div className=" absolute -top-2 right-0 mr-5  transition-all group-hover:opacity-0 ">
        {index === 0 && (
          <>
            <div className=" relative w-full rounded-lg bg-red-400 px-3 pb-0.5 text-sm font-bold text-white">
              Newest Message
              <hr className="   absolute top-1/2 right-32  z-0  w-96   rounded-full border border-red-400 bg-red-400" />
            </div>
          </>
        )}
      </div>
      <div className="absolute top-0.5    right-0.5     opacity-0 group-hover:opacity-100">
        <div className=" flex items-center rounded border-zinc-900  bg-zinc-700 shadow-sm  shadow-zinc-900 transition-all hover:shadow-md hover:shadow-zinc-900">
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

const MessageLikes = ({ message }) => {
  const likes = message.expand["likes(message)"];
  return (
    <div className="group/like  relative mt-1 w-16">
      <div className="flex items-center gap-x-2 rounded-xl border-2 border-indigo-500 p-1 text-xl font-bold text-zinc-300">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1533/1533908.png"
          alt="Thumbs Up Icon"
          className="h-6 w-6 rounded-full"
        />
        {likes.length}
      </div>
      <div className=" absolute bottom-12 left-0 w-72 origin-bottom-left  scale-0 rounded-lg bg-zinc-900  p-2 text-zinc-300 transition-all  ease-linear group-hover/like:scale-100  ">
        <div className="flex items-center gap-x-2 rounded-xl    p-1 text-sm font-bold text-zinc-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1533/1533908.png"
            alt="Thumbs Up Icon"
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            Thumbs Up By
            <div className="flex flex-col overflow-y-scroll">
              {likes.map((l,index) => (
                <div className="" key={index}>{l.expand.user.username}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(MessageCard);
