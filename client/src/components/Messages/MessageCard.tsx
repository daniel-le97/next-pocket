/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @next/next/no-img-element */
import { observer } from "mobx-react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TimeAgo from "timeago-react";
import DeleteMessage from "./MessageOptions/DeleteMessage";
import EditMessage from "./MessageOptions/EditMessage";
import LikeMessage from "./MessageOptions/LikeMessage";
import rehypeRaw from "rehype-raw";
import Pop from "utils/Pop";
import type { LikesWithUser, MessageWithUser } from "PocketBaseTypes";
import { AppState } from "AppState";
import UserAvatar from "../GlobalComponents/UserAvatar";
import CodeBlock from "utils/CodeBlock";




const MessageCard = ({message,index,}: {message: MessageWithUser;index: number;}) => {
  const messageQuery = AppState.messageQuery;
  const likes = AppState.messageLikes[index] ?? null
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
          avatarUrl={message.user.avatarUrl}
        />
        {/* <UserStatus user={message?.expand?.user} /> */}
      </div>
      <div className=" message-content      ">
        <p className=" font-bold  text-red-500">
          {message.user?.username}
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
          className="markdown"
          rehypePlugins={[rehypeRaw]}
          components={{
            code: ({ inline, className, children, ...props }) => {
              if (inline) {
                return <code className="text-zinc-300">{children}</code>;
              }
              return (
                <div className="markdown-container ">
                  <div className=" markdown-banner ">
                    {/* <span className="language-label">{language}</span> */}
                    <button
                      onClick={handleCopyClick}
                      className="markdown-copy-btn"
                    >
                      Copy
                    </button>
                  </div>
                  <CodeBlock
                    language={className && className.replace(/language-/, "")}
                    value={children as string}
                    {...props}
                  />
                </div>
              );
            },
          }}
        />

        {likes?.length >= 1 && <MessageLikes likes={likes} />}
      </div>
      {index === 0 && <IsNewestMessage />}
      <div className="message-options">
        <div className="message-options-container">
          {AppState.user?.id == message.user.id ? (
            <>
              <EditMessage message={message} />
              <DeleteMessage messageId={message.id} />
            </>
          ) : (
            <LikeMessage messageId={message.id}  />
          )}
        </div>
      </div>
    </div>
  );
};

const IsNewestMessage = () => {
return (
  <>
    <div className=" newest-message">
      <div className="newest-message-container">
        Newest Message
        <hr className="  newest-message-line" />
      </div>
    </div>
  </>
);
}

const MessageLikes = ({ likes }: { likes: LikesWithUser[] | null }) => {

  function getLikes(likes: LikesWithUser[]){
    const length = likes.length
    if(length > 0){
      return length
    }
    return 0
  }

  const hasLikes = getLikes(likes) !== 0

  return (
    
      <div className="message-like-container group/like"> 
      <img
        src="https://cdn-icons-png.flaticon.com/512/1533/1533908.png"
        alt="Thumbs Up Icon"
        className="h-6 w-6 rounded-full"
        />
      {likes?.length}
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
              { likes && likes.map((l, index) => (
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
