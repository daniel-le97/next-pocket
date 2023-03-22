/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppState } from "../../../AppState";

import { messageService } from "../../services/MessageService";
import Loader from "../Loader";
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
      className="flex   h-full  flex-col-reverse overflow-auto pb-16"
    >
     
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={AppState.messages.length}
        next={fetchMore}
        className=" mb-24 flex flex-col-reverse pt-6   "
        inverse={true} //
        hasMore={AppState.totalPages != AppState.page}
        loader={<Loader  show={AppState.totalPages != AppState.page} />}
        scrollableTarget="scrollableDiv"
      >
        {AppState.messages.map((message, index) => {
          const currentDate = new Date(message.created).toLocaleDateString();
          const todaysDate = new Date(Date.now()).toLocaleDateString();
          const previousDate =
            index > 0
              ? new Date(
                  AppState.messages[index - 1]!.created
                ).toLocaleDateString()
              : null;

          // check if current message date is different from previous message date
          const isNewDay = currentDate !== previousDate;
          const notTodaysDate = currentDate !== todaysDate;
          return (
            <div key={index}>
              {
                <MessageCard
                  messages={AppState.messages}
                  message={message}
                
                />
              }
              <div>
                {isNewDay && notTodaysDate && (
                  <div className="new-date">
                    <hr className="w-3/6  opacity-40" />
                    <div className=" new-date-text">{currentDate}</div>

                    <hr className="w-3/6  opacity-40" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
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
