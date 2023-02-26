import React from "react";
import MessagesList from "./MessagesList";

import TopNavigation from "./TopNavigation";

const MessagesContainer = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <MessagesList />
      </div>
    </div>
  );
};

export default MessagesContainer;
