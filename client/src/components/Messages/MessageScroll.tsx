/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppState } from "../../../AppState";
import { timeago } from "../../../utils/TimeAgo";
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
      style={{
      height:1200,
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
      }}
      className="flex flex-col-reverse  overflow-auto py-10"
    >
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={AppState.messages.length}
        next={fetchMore}
        style={{
         
     
          display: "flex",
          flexDirection: "column-reverse",
        }}
        className="py-5"
        inverse={true} //
        hasMore={true}
        loader={<Loader show={true} />}
        scrollableTarget="scrollableDiv"
      >
        {AppState.messages.map((message, index) =>{
          const currentDate = new Date(message.created).toLocaleDateString();
          const previousDate =
            index > 0
              ? new Date(AppState.messages[index - 1].created).toLocaleDateString()
              : null;

          // check if current message date is different from previous message date
          const isNewDay = currentDate !== previousDate;
           return (
             <div key={index}>
               <div>
                 {isNewDay && (
                   <div className="new-date">
                     <hr className="w-3/6  opacity-40" />
                     <div className=" new-date-text">
                       {currentDate}
                     </div>

                     <hr className="w-3/6  opacity-40" />
                   </div>
                 )}
               </div>

               {
                 <MessageCard
                   messages={AppState.messages}
                   message={message}
                   index={index}
                 />
               }
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
