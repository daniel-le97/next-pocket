import React from "react";
import MessagesList from "./MessagesList";

import TopNavigation from "./TopNavigation";
import InfiniteScroll from 'react-infinite-scroll-component';
import { AppState } from "../../../AppState";
import { messageService } from "../../services/MessageService";
import { observer } from "mobx-react";
import MessageScroll from "./MessageScroll";

const MessagesContainer = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        {/* <MessagesList /> */}
        <MessageScroll/>
      </div>
    </div>
  );
};

// const InfiniteMessages = () => {
//   console.log('mounted');
  
//   const fetchMore = async()=> {
//     console.log(AppState.activeChannel!.id);
    
//     await messageService.getMessagesByChannelId(AppState.activeChannel!.id)
//   }
//   return (
//     <InfiniteScroll
//       dataLength={AppState.messages.length}
//       next={fetchMore}
//       hasMore={AppState.totalPages != AppState.page}
//       style={{ display: 'flex', flexDirection: 'column-reverse' }}
//       inverse={true}
//       loader={<div>loading</div>}
//     >
//       {AppState.messages.map((i, index) => (
//         <div key={index}>{JSON.stringify(i)}</div>
//       ))}
//     </InfiniteScroll>
//   );
// }

export default observer(MessagesContainer);
