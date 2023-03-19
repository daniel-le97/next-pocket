/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessageService";
import MessageCard from "./MessageCard";
const MessageScroll = () => {
  const fetchMore = async () => {
    const channelId = AppState.activeChannel?.id;
    console.log(
      "CurrentPage:",
      AppState.page,
      "TotalPages:",
      AppState.totalPages
    );

    await messageService.getMessagesByChannelId(channelId);
  };
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 300,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
    >
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={AppState.messages.length}
        next={fetchMore}
        style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={true}
        loader={<h4>Loading...</h4>}
        scrollableTarget="scrollableDiv"
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
            {/* {new Date(message.created).toLocaleString()} */}
            {message.id}
          </div>
        ))}
      </InfiniteScroll>
    </div>
    // <div className="" id="scrollableDiv">
    //   <InfiniteScroll
    //     dataLength={AppState.messages.length}
    //     next={fetchMore}
    //     hasMore={AppState.totalPages != AppState.page}
    //     loader={<div>loading</div>}
    //     // style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
    //     // inverse={true} //
    //     endMessage={
    //       <p style={{ textAlign: "center" }}>
    //         <b>Yay! You have seen it all</b>
    //       </p>
    //     }
    //   >
    //     {AppState.messages.map((message, index) => (
    //       <div key={index}>
    //         {
    //           <MessageCard
    //             messages={AppState.messages}
    //             message={message}
    //             index={index}
    //           />
    //         }
    //         {/* {new Date(message.created).toLocaleString()} */}
    //         {message.id}
    //       </div>
    //     ))}
    //   </InfiniteScroll>
    // </div>
  );
};

export default observer(MessageScroll);
