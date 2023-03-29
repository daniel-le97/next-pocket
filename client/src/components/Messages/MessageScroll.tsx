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
  async function fetchMore() {
    const channelId = AppState.activeChannel?.id;
    await messageService.getMessagesByChannelId(channelId!);
  }
  let subscribeMessage: UnsubscribeFunc | null;
  let subscribeLike: UnsubscribeFunc | null;
  useEffect(() => {
    (async () => {
      try {
        subscribeMessage = await messageService.subscribe();
        subscribeLike = await likesService.subscribe();
        console.log("subscribed");
      } catch (error) {
        Pop.error(error, "like or message subscription failed");
      }
    })();
    return () => {
      subscribeLike?.();
      subscribeMessage?.();
    };
  }, []);
  return (
    <div
      id="scrollableDiv"
      className="flex h-full  flex-col-reverse overflow-auto pb-32 pt-6"
    >
      <InfiniteScroll
        dataLength={AppState.messages.length}
        next={fetchMore}
        className="flex flex-col-reverse pt-6   "
        inverse={true} //
        hasMore={AppState.totalPages != AppState.page}
        loader={<Loader show={AppState.totalPages != AppState.page} />}
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
    </div>
  );
};

export default observer(MessageScroll);
