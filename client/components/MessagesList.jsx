import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_URL);
pb.autoCancellation(false);
const ResultsList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
     await pb.collection("messages").subscribe("*", function (e) {
     const list = e.record
     console.log(list);
    });
     
      //   setMessages(resultList.items);
    };
    fetchMessages();
  }, []);

  return (
    <ul>
      {messages.map((message) => (
        <div key={message.id} className="post">
          <div className="avatar-wrapper">
            <img
              src={
                `https://nextcord.apps.devopportunities.dev/api/files/_pb_users_auth_/${message.user}/${message.expand.user.avatar}` ||
                `https://avatars.dicebear.com/api/open-peeps/.svg`
              }
              alt=""
              className="avatar"
              width={100}
              height={100}
            />
          </div>

          <div className="post-content">
            <p className="post-owner">
              {message.expand.user.name}
              <small className="timestamp">{message.created}</small>
            </p>
            <p className="post-text">{message.text}</p>
          </div>
        </div>
      ))}
    </ul>
  );
};
 export default ResultsList