import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaSearch, FaHashtag, FaRegBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { AppState } from "../../../AppState";
import { pb } from "../../../utils/pocketBase";
import useDarkMode from '../../../hooks/useDarkMode'
import { BsMoon, BsSun } from "react-icons/bs";
import { MessagesResponse } from "../../../PocketBaseTypes/pocketbase-types";
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
      <HashtagIcon />
      <Title room={channel}  query={query}/>
     {/* <ThemeIcon/> */}
      <Search />
      <BellIcon />
      <UserCircle />
    </div>
  );
};



const Search = () => {
  const [query, setQuery] = useState("");

  const findMessage = async (e:any) => {
    AppState.messageQuery = e;
    const getMessage = async () => {
      const res = await pb.collection("messages").getList(1, 10, {
        filter: `text~"${e}"`,
        expand: "user",
      });
      let updatedMessages = AppState.messages;
      updatedMessages = res.items as unknown  as MessagesResponse<unknown>[]
      AppState.messages = updatedMessages;
    };
  await getMessage();
  };

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={async(event) =>
        {
           await findMessage(event.target.value);
           setQuery(event.target.value)
        }
        }
      />
      <FaSearch size="18" className="text-secondary my-auto" />
    </div>
  );
};
const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon" />;
const UserCircle = () => (
  <FaUserCircle size="24" className="top-navigation-icon" />
);
const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = ({ room ,query }:{room:string,query:string}) => {
  return <h5 className="title-text">{room ? room : query}</h5>;
};

export default observer(TopNavigation);
