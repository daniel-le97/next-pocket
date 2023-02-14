import React from "react";
import { useEffect, useState } from "react";
import { currentUser, pb } from "../util/pocketBase";
// import { currentUser, pb } from "./pocketbase";

const Messages = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  let unsubscribe = null;

  useEffect(() => {
    const fetchMessages = async () => {
      const resultList = await pb.collection("messages").getList(1, 50, {
        sort: "created",
        expand: "user",
      });
      setMessages(resultList.items);
    };
    fetchMessages();

    const handleRealtimeMessages = async ({ action, record }) => {
      if (action === "create") {
        const user = await pb.collection("users").getOne(record.user);
        record.expand = { user };
        setMessages((prevMessages) => [...prevMessages, record]);
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
          subscription.unsubscribe();
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
    <div className="messages">
      {messages.map((message) => (
        <div className="msg" key={message.id}>
          <img
            className="avatar"
            src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`}
            alt="avatar"
            width="40px"
          />
          <div>
            <small>Sent by @{message.expand?.user?.username}</small>
            <p className="msg-text">{message.text}</p>
          </div>
        </div>
      ))}
      <form onSubmit={sendMessage}>
        <input
          placeholder="Message"
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
