import React from "react";
import MessagesList from "./MessagesList";

import TopNavigation from "./TopNavigation.jsx";

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
