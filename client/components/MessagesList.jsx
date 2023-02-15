import { useEffect, useState, useRef } from "react";
import { observer } from "mobx-react";
import { pb, useCurrentUser } from "../utils/pocketBase";
// import { currentUser, pb } from "./pocketbase";
import { BsPlusCircleFill } from "react-icons/bs";
import { UserLogin } from "../src/models/user";
const Messages = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const listRef = useRef(null);
  let unsubscribe = null;
  const checkForDuplicate = (messages, newMessage) => {
    const messageIds = messages.map((message) => message.id);
    return !messageIds.includes(newMessage.id);
  };
  useEffect(() => {
    const fetchMessages = async () => {
      const resultList = await pb.collection("messages").getList(1, 100, {
        sort: "created",
        expand: "user",
      });
      setMessages(resultList.items);
    };
    fetchMessages();

    unsubscribe = async () =>
      await pb
        .collection("messages")
        .subscribe("*", async ({ action, record }) => {
          if (action === "create") {
            // Fetch associated user
            const user = await pb.collection("users").getOne(record.user);
            record.expand = { user };
            setMessages((prevMessages) => [...prevMessages, record]);
            // messages = [...messages, record];
          }
          if (action === "delete") {
            setMessages((prevMessages) =>
              prevMessages.filter((m) => m.id !== record.id)
            );
          }
        });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    const user = pb.authStore.model;
    const data = {
      text: newMessage,
      user: user.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    setNewMessage("");
  };

  return (
    <div className="messages snap-end pb-14" ref={listRef}>
      {messages.map((message, index) => (
        <div className=" post  group  relative" key={message.id}>
          <div className="avatar-wrapper">
            <img
              className="avatar"
              src={
                `https://nextcord.apps.devopportunities.dev/api/files/_pb_users_auth_/${message.user}/${message.expand.user.avatar}` ||
                `https://api.dicebear.com/5.x/bottts-neutral/svg`
              }
              alt="avatar"
              width="40px"
            />
          </div>
          <div className="post-content">
            <p className="post-owner">
              {message.expand?.user?.username}
              <small className="timestamp">
                {new Date(message.created).toLocaleDateString()}
              </small>
            </p>
            <p className="post-text">{message.text}</p>
          </div>
          <div className="absolute bottom-16 right-0 mr-5 ">
            {index === messages.length - 1 && (
              <div className="transition-all group-hover:opacity-0  ">
                <div className=" relative w-full rounded-lg bg-red-400 px-3 text-sm font-bold text-white">
                  Newest Message
                  <hr className=" absolute top-1/2 right-32  z-0 ml-32 w-full   rounded-full border border-red-400 bg-red-400 " />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <div className="bottom-bar   ">
        <PlusIcon />
        <form onSubmit={sendMessage}>
          <input
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Enter message..."
            className="bottom-bar-input"
          />
        </form>
      </div>
      {/* <form onSubmit={sendMessage}>
        <input
          placeholder="Message"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form> */}
    </div>
  );
};
const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
  />
);
export default observer(Messages);
