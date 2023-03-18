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
    // console.log(AppState.activeChannel!.id);
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
      // below props only if you need pull down functionality
      refreshFunction={fetchMore}
      pullDownToRefresh
      pullDownToRefreshThreshold={50}
      pullDownToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8595; Pull down to refresh</h3>
      }
      releaseToRefreshContent={
        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
      }
    >
      {AppState.messages.map((i, index) => (
        <div key={index}>
          {
            <MessageCard
              messages={AppState.messages}
              message={i}
              index={index}
            />
          }
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default observer(MessageScroll)