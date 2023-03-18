/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessageService";
import MessageCard from "./MessageCard";
const MessageScroll = () => {
  // console.log("mounted");
console.log(AppState.messages);

  const fetchMore = async () => {
    console.log('hello');
    const channelId = "ckxz8lx9amoq8aq";

    await messageService.getMessagesByChannelId(channelId);
  };
  return (
    <InfiniteScroll
      dataLength={AppState.messages.length}
      next={fetchMore}
      hasMore={AppState.totalPages != AppState.page}
      loader={<div>loading</div>}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {AppState.messages.map((message, index) => (
        <div key={index}>
          {
            <MessageCard
              messages={AppState.messages}
              message={message}
              index={index}
            />
          }
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default observer(MessageScroll)