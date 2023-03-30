import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { AppState } from "../../../AppState";
import { pb } from "../../../utils/pocketBase";
import {
  Collections,
  MessagesResponse,
} from "../../../PocketBaseTypes/pocketbase-types";
import { MessageWithUser } from "PocketBaseTypes/utils";
const TopNavigation = () => {
  const [channel, setRoom] = useState<string>("");
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState<string>("");
  useEffect(() => {
    // @ts-ignore
    setRoom(AppState?.activeChannel?.title);
  }, [AppState?.activeChannel?.title]);

  return (
    <div className="top-navigation">
      <FaHashtag size="20" className="title-hashtag" />
      <h5 className="channel-room-title">
        {channel ? channel : query}
        {AppState.messageQuery !== "" && (
          <span className="text-gray-500 text-opacity-80">
            {" "}
            - Search Results
          </span>
        )}
      </h5>
      <Search />
      <FaRegBell size="24" className="top-navigation-icon" />
      <FaUserCircle size="24" className="top-navigation-icon" />
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(true);
  const findMessage = async (query: string) => {
    AppState.messages = [];
    AppState.page = 1;
    setQuery(query);
    AppState.messageQuery = query;

    const res = await pb
      .collection(Collections.Messages)
      .getList<MessageWithUser>(1, 10, {
        filter: `content ~ "${query}"`,
        expand: "user,reactions(messageId)",
      });
    AppState.totalPages = res.totalPages;
    let updatedMessages = AppState.messages;
    updatedMessages = res.items as unknown as MessageWithUser[];
    AppState.messages = updatedMessages;
  };
  const toggleInput = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className=" relative  flex
    
    items-center
    justify-start  gap-x-2
   
    "
    >
      <input
        className={` text-gray-300  transition-all  duration-700 focus:w-72  ${
          expanded ? "w-full" : ""
        }`}
        type="text"
        placeholder="Search"
        value={AppState.messageQuery}
        onChange={async (event) => {
          await findMessage(event.target.value);
        }}
      />
      <FaSearch
        size={22}
        className="   text-secondary absolute right-2 z-10 my-auto text-gray-500"
        onClick={toggleInput}
      />
    </div>
  );
};

export default observer(TopNavigation);
