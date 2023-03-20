/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import { BsEmojiSmile, BsPencil, BsXCircle } from "react-icons/bs";
import TimeAgo from "timeago-react";
import { AppState } from "../../../AppState";
import type { MessageWithUser } from "../../../PocketBaseTypes/utils";
import { containsUrl } from "../../../utils/ContainsUrl";
import { getDate } from "../../../utils/helpers";
import { timeago } from "../../../utils/TimeAgo";

const MessageCard = ({
  messages,
  message,
  index,
}: {
  messages: MessageWithUser[];
  message: MessageWithUser;
  index: number;
}) => {
  const messageQuery = AppState.messageQuery;
  return (
    <div
      className={
        messageQuery != ""
          ? " message-filtered group relative"
          : " message  group  relative"
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
      <div className="message-content">
        <p className="message-owner">
          {message.expand?.user?.username}
          <small className="timestamp">
            {
              <TimeAgo
                datetime={message.created}
                locale={"en-US"}
                style={{ margin: 5 }}
              />
            }
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
          <p className="message-text">{message.text}</p>
        )}
      </div>
      <div className="newest-message ">
        {index === 0 && (
          <>
            <div className=" newest-message-badge">
              Newest Message
              <hr className=" newest-message-line " />
            </div>
          </>
        )}
      </div>
      <div className="message-options">
        <div className=" message-options-box">
          <div className="group/item relative ">
            <BsEmojiSmile size={22} />
            <span className=" message-icon-tooltip  ">Like</span>
          </div>
          <div className="group/item relative">
            <BsPencil size={22} />
            <span className=" message-icon-tooltip  ">Edit</span>
          </div>
          <div className="group/item relative">
            <BsXCircle size={22} />
            <span className=" message-icon-tooltip  ">Remove</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(MessageCard);
