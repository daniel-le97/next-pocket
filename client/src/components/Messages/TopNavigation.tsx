import { observer } from "mobx-react";
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch, FaHashtag } from "react-icons/fa";
import { AppState } from "../../../AppState";
import { pb } from "../../../utils/pocketBase";
import { Collections } from "../../../PocketBaseTypes/pocketbase-types";
import {
  Message,
  MessageWithUser,
  TMessageWithUser,
} from "PocketBaseTypes/utils";
import { action } from "mobx";
import { Tooltip } from "@nextui-org/react";
const TopNavigation = () => {
  return (
    <div className="top-navigation">
      <FaHashtag size="20" className="title-hashtag" />
      <h5 className="channel-room-title">
        {AppState.messageQuery === ""
          ? AppState.activeChannel?.title
          : "Searching Messages Within Server"}
      </h5>
      <Search />
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(true);
  const debouncedFindMessage = useMemo(
    () => async (query: string) => {
      const res = await pb
        .collection(Collections.Messages)
        .getList<MessageWithUser>(1, 10, {
          filter: `content ~ "${query}"`,
          expand: "user,likes(message).user",
        });

      const unMessages = res.items as unknown as TMessageWithUser[];
      action(() => {
        const messages = unMessages.map((message, index) => {
          const _Message: MessageWithUser = new Message(message);
          AppState.messageLikes[index] = message.expand["likes(message)"] || [];
          return _Message;
        });
        AppState.messages = [...AppState.messages, ...messages];
        AppState.totalPages = res.totalPages;
      })();
    },
    []
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AppState.messageQuery = query;
    AppState.messages = [];
    AppState.page = 1;
    debouncedFindMessage(query);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className=" relative  flex items-center justify-start  gap-x-2">
      <input
        className={` pr-10 dark:text-gray-300 transition-all   duration-700 focus:w-72  ${
          expanded ? "w-full" : ""
        }`}
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="absolute right-2 z-10 ">
        <Tooltip content="Search Message" color="invert" placement="bottom">
          <button className="m-0 pt-1 ">
            <FaSearch
              size={22}
              className={`     my-auto text-gray-500  hover:text-indigo-500 dark:hover:text-emerald-500 ${
                query !== "" ? "text-emerald-500" : ""
              }`}
            />
          </button>
        </Tooltip>
      </div>
    </form>
  );
};

export default observer(TopNavigation);
