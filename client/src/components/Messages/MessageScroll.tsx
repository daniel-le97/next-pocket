/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { likesService } from "@/services/LikesService";
import { observer } from "mobx-react";
import type { UnsubscribeFunc } from "pocketbase";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Pop from "utils/Pop";
import { AppState } from "../../../AppState";

import { messageService } from "../../services/MessagesService";
import Loader from "../GlobalComponents/Loader";
import MessageCard from "./MessageCard";
const MessageScroll = () => {
  let subscribeMessage: UnsubscribeFunc | null;
  let subscribeLike: UnsubscribeFunc | null;
  async function fetchMore() {
    // const channelId = AppState.activeChannel?.id;
    AppState.page++;
    await messageService.getMessagesByChannelId(AppState.activeChannel?.id!);
  }

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       subscribeMessage = await messageService.subscribe();
  //       subscribeLike = await likesService.subscribe();
  //     } catch (error) {
  //       Pop.error(error, "like or message subscription failed");
  //     }
  //   })();
  //   return () => {
  //     subscribeLike?.();
  //     subscribeMessage?.();
  //   };
  // }, []);
  return (
    <div
      id="scrollableDiv"
      className={`infinite-scroll-container  ${
        AppState.messageQuery != "" ? "infinite-scroll-container-search" : ''
      }`}
    >
      {AppState.messages.length && (
        <InfiniteScroll
          dataLength={AppState.messages.length}
          next={fetchMore}
          className="flex flex-col-reverse pt-6    "
          inverse={true}
          hasMore={AppState.totalPages != AppState.page}
          loader={<LoaderProgress />}
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
                {<MessageCard index={index} message={message} />}

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
      )}

      {/* {AppState.messageQuery == "" && AppState.messages.length == 0 && (
        <LoaderProgress />
      )} */}
      {AppState.messageQuery != "" && AppState.messages.length == 0 && (
        <div className="container w-1/2 rounded  p-3 text-center text-xl text-gray-400">
          No messages contain
          <br />
          <div className="my-2 font-bold text-gray-200">
            {AppState.messageQuery}
          </div>
          Refine Your search
        </div>
      )}
    </div>
  );
};

export const LoaderProgress = () => {
  return (
    <div className="fixed inset-0 h-1">
      <div className="relative h-1 w-full overflow-hidden rounded-lg shadow  ">
        <div className="animate-loader   absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 shadow-md shadow-indigo-500  "></div>
      </div>
    </div>
  );
};
export default observer(MessageScroll);
