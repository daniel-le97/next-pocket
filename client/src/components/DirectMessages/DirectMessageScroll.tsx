/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppState } from "../../../AppState";
import { ConvertDMToMessage, Message } from "../../../PocketBaseTypes";
import { directMessageService } from "../../services";

import Loader from "../GlobalComponents/Loader";
import MessageCard from "../Messages/MessageCard";
// import { DirectMessageCard } from "./DirectMessageContainer";

const DirectMessageScroll = () => {
  const router = useRouter();
  const id = router.query.id;
  const directMessages = AppState.directMessages
  .filter(dm => dm.id != id)
  .map(dm => new ConvertDMToMessage(dm) as unknown as Message);
  console.log("directMessages", directMessages);
  
  const fetchMore = async () => {
    const channelId = AppState.activeChannel?.id;
    console.log(
      "CurrentPage:",
      AppState.page,
      "TotalPages:",
      AppState.totalPages
    );

    await directMessageService.getDirectMessages(id as string);
  };
  return (
    <div
      id="scrollableDiv2"
      className=" flex h-full flex-col-reverse overflow-auto pb-16 "
    >
      {/*Put the scroll bar always on the bottom*/}
      <InfiniteScroll
        dataLength={directMessages.length}
        next={fetchMore}
        className="  flex  pt-6 mb-24 flex-col-reverse "
        inverse={true} //
        hasMore={AppState.totalPages != AppState.page}
        loader={<Loader show={AppState.totalPages != AppState.page} />}
        scrollableTarget="scrollableDiv2"
      >
        {directMessages.map((message, index) => {
          const currentDate = new Date(message.created).toLocaleDateString();
          const todaysDate = new Date(Date.now()).toLocaleDateString();
          const previousDate =
            index > 0
              ? new Date(
                  directMessages[index - 1]!.created
                ).toLocaleDateString()
              : null;

          // check if current message date is different from previous message date
          const isNewDay = currentDate !== previousDate;
          const notTodaysDate = currentDate !== todaysDate;
          return (
            <div key={index}>
              {
               <MessageCard message={message} index={index}/>
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
   
  );
};

export default observer(DirectMessageScroll);
