/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";
import { AppState } from "../../../AppState";
import { directMessageService, messageService } from "../../services";
import MessageCard from "../Messages/MessageCard";
import { LoaderProgress } from "./LoaderProgressBar";
import noMessagesImage from '../../assets/void.svg'

const InfiniteMessageScroll = () => {
  const router = useRouter();
  const id = router.query.id;
  const isDMRoute = router.pathname.includes("DirectMessages");
  const messages = isDMRoute ? AppState.directMessages : AppState.messages;
  
  // console.log("directMessages", directMessages);

  const fetchMore = async () => {
    AppState.page++;
    if (isDMRoute) {
    await directMessageService.getDirectMessages(AppState.dmRouterQuery);
    } else {
      await messageService.getMessagesByChannelId(id as string);
  } 
}
  return (
    <div
      id="scrollableDiv2"
      className={`infinite-scroll-container  ${
        AppState.messageQuery != "" ? "infinite-scroll-container-search" : ""
      }`}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={fetchMore}
        className="    flex flex-col-reverse pt-6 "
        inverse={true}
        hasMore={AppState.totalPages != AppState.page}
        loader={messages.length >= 1 && <LoaderProgress />}
        scrollableTarget="scrollableDiv2"
      >
        {messages.map((message, index) => {
          const currentDate = new Date(message.created).toLocaleDateString();
          const todaysDate = new Date(Date.now()).toLocaleDateString();
          const previousDate =
            index > 0
              ? new Date(messages[index - 1]!.created).toLocaleDateString()
              : null;

          // check if current message date is different from previous message date
          const isNewDay = currentDate !== previousDate;
          const notTodaysDate = currentDate !== todaysDate;
          return (
            <div key={index}>
              {<MessageCard message={message} index={index} />}
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

 
      <NoMessagesFoundInSearch />
    </div>
  );
};


const NoMessagesFoundInSearch = () => {
  return (
    <>
      {AppState.messageQuery != "" && AppState.messages.length == 0 && (
        <div className="container flex h-full w-full flex-col items-center justify-center rounded  p-3 text-center text-xl text-gray-400">
          No messages contain
          <br />
          <div className="my-2 font-bold text-gray-200">
            {AppState.messageQuery}
          </div>
          Refine Your search
        </div>
      )}
    </>
  );
};
export default observer(InfiniteMessageScroll);
