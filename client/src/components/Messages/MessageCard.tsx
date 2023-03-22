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

const MessageCard = ({
  messages,
  message,
}: {
  messages: MessageWithUser[];
  message: MessageWithUser;
}) => {
  const [reaction, setReaction] = useState(false);
  const messageQuery = AppState.messageQuery;
  return (
    <div
      className={
        messageQuery != "" ? " message-filtered group " : " message  group  "
      }
    >
      <div className="relative m-0 ml-auto mb-auto flex w-12 flex-col items-center">
        <img
          className="mx-0  mb-auto mt-0 h-12 w-12  cursor-pointer rounded-full bg-gray-100 object-cover object-top shadow-md shadow-zinc-500 dark:shadow-zinc-800"
          src={
            message.expand?.user.avatarUrl ||
            `https://api.dicebear.com/5.x/bottts-neutral/svg`
          }
          alt="avatar"
          width="40px"
        />
        {/* <UserStatus user={message?.expand?.user} /> */}
      </div>
      <div className="ml-auto flex w-4/5 flex-col justify-start  whitespace-pre-wrap overflow-x-scroll ">
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
        <p className="text-lg font-semibold dark:text-gray-300"></p>
        <ReactMarkdown
          children={message.content}
          className="font-sans text-lg text-zinc-300  whitespace-pre-wrap"
          rehypePlugins={[rehypeRaw]}
          renderers={{ code: CodeBlock }}
        ></ReactMarkdown>
        {/* {containsUrl(message.text) ? (
          <a
            target="_blank"
            href={message.text}
            className="font-semibold text-blue-500 hover:underline"
          >
            {message.text}
          </a>
        ) : (
         
        )} */}
      </div>
      <div className=" absolute bottom-20 right-0 mr-5  transition-all group-hover:opacity-0 ">
        {/* {index === 0 && (
          <>
            <div className=" relative w-full rounded-lg bg-red-400 px-3 pb-0.5 text-sm font-bold text-white">
              Newest Message
              <hr className="  absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400" />
            </div>
          </>
        )} */}
      </div>
      <div className="absolute bottom-24 right-0  mr-5   opacity-0 group-hover:opacity-100">
        <div className=" flex rounded border-zinc-900  bg-zinc-700 shadow-sm  shadow-zinc-900 transition-all hover:shadow-md hover:shadow-zinc-900">
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


const CodeBlock = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};
export default observer(MessageCard);
