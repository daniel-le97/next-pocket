import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { currentUser, pb } from "../util/pocketBase";
// import { currentUser, pb } from "./pocketbase";

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

    const handleRealtimeMessages = async ({ action, record }) => {
      if (action === "create") {
        // const user = await pb.collection("users").getOne(record.user);
        // record.expand = { user };
        fetchMessages();
document.querySelector('.messages')?.classList.toggle('snap-end')
        //  if (checkForDuplicate(messages, record)) {
        //    setMessages((prevMessages) => [...prevMessages, record]);
        //  }
      }
      if (action === "delete") {
        setMessages((prevMessages) =>
          prevMessages.filter((m) => m.id !== record.id)
        );
      }
    };

    pb.collection("messages")
      .subscribe("*", handleRealtimeMessages)
      .then((subscription) => {
        unsubscribe = () => {
          subscription?.unsubscribe();
        };
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const sendMessage = async (event) => {
    event.preventDefault();
    const data = {
      text: newMessage,
      user: currentUser.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    setNewMessage("");
  };

  return (
    <div className="messages snap-end pb-14" ref={listRef}>
      {messages.map((message) => (
        <div className=" post  " key={message.id}>
          <div className="avatar-wrapper">
            <img
              className="avatar"
              src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`}
              alt="avatar"
              width="40px"
            />
          </div>
          <div className="post-content">
            <p className="post-owner">
              {message.expand?.user?.username}
              <small className="timestamp">{message.created}</small>
            </p>
            <p className="post-text">{message.text}</p>
          </div>
        </div>
      ))}

      <div className="bottom-bar   ">
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

export default Messages;
