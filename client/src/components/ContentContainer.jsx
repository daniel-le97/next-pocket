import React from "react";
import MessagesList from "./MessagesList";

import TopNavigation from "../components/TopNavigation.jsx";

const ContentContainer = () => {
  return (
    <div className="content-container">
      <TopNavigation />
      <div className="content-list">
        <MessagesList />
      </div>
    </div>
  );
};

export default ContentContainer;
