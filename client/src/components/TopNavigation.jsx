import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { FaSearch, FaHashtag, FaRegBell, FaUserCircle, FaSun, FaMoon } from "react-icons/fa";
import { AppState } from "../../AppState";
import { pb } from "../../utils/pocketBase";
import useDarkMode from '../../hooks/useDarkMode'
const TopNavigation = () => {
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    setRoom(AppState?.activeRoom?.title);
  }, [AppState?.activeRoom?.title]);

  return (
    <div className="top-navigation">
      <HashtagIcon />
      <Title room={room}  query={query}/>
     <ThemeIcon/>
      <Search />
      <BellIcon />
      <UserCircle />
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
 
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const Search = () => {
  const [query, setQuery] = useState("");

  const findMessage = async (e) => {
    AppState.messageQuery = e;
    const getMessage = async () => {
      const res = await pb.collection("messages").getList(1, 10, {
        filter: `text~"${e}"`,
        expand: "user",
      });
      let updatedMessages = AppState.messages;
      updatedMessages = res.items;
      AppState.messages = updatedMessages;
    };
    getMessage();
  };

  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(event) =>
          findMessage(event.target.value) && setQuery(event.target.value)
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
const Title = ({ room,query }) => {
  return <h5 className="title-text">{room ? room : query}</h5>;
};

export default observer(TopNavigation);
