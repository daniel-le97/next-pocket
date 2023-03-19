/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import { BsEmojiSmile, BsPencil, BsXCircle } from "react-icons/bs";
import TimeAgo from "timeago-react";
import { AppState } from "../../../AppState";
import type { MessageWithUser } from "../../../PocketBaseTypes/utils";
import { containsUrl } from "../../../utils/ContainsUrl";
import { timeago } from "../../../utils/TimeAgo";


const MessageCard = ({
  messages,
  message,
  index,
}: {
  messages: MessageWithUser[];
  message: MessageWithUser
  index: number;
}) => {
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
            message.expand?.user.avatarUrl ||
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
            {<TimeAgo datetime={message.created} locale={'en-US'}/>}
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
        {/* {index === messages.length - 1 && (
          <div className=" transition-all group-hover:opacity-0  ">
            <div className=" relative w-full rounded-lg bg-red-400 px-3 text-sm font-bold text-white">
              Newest Message
              <hr className=" absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400 " />
            </div>
          </div>
        )} */}
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

export default observer(MessageCard);
