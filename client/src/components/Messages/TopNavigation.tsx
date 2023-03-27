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
import { MessagesResponse } from "../../../PocketBaseTypes/pocketbase-types";
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
      <h5 className="title-text">{channel ? channel : query}</h5>
      <Search />
      <FaRegBell size="24" className="top-navigation-icon" />
      <FaUserCircle size="24" className="top-navigation-icon" />
    </div>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");

  const findMessage = async (e: any) => {
    AppState.messageQuery = e;
    const getMessage = async () => {
      const res = await pb.collection("messages").getList(1, 10, {
        filter: `text~"${e}"`,
        expand: "user",
      });
      let updatedMessages = AppState.messages;
      updatedMessages = res.items as unknown as MessageWithUser[];
      AppState.messages = updatedMessages;
    };
    await getMessage();
  };

  return (
    <div
      className=" flex 
    
    items-center
    justify-start  
   
    "
    >
      <input
        className=""
        type="text"
        placeholder="Search..."
        value={query}
        onChange={async (event) => {
          await findMessage(event.target.value);
          setQuery(event.target.value);
        }}
      />
      <FaSearch size="18" className="text-secondary my-auto" />
    </div>
  );
};

export default observer(TopNavigation);
