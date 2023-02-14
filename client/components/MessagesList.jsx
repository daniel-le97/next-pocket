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
     const records = await pb
       .collection("messages")
       .getFullList(200 /* batch size */, {
         sort: "-created",
         expand:'user'
       });
      console.log(records);
        setMessages(records);
    };
    fetchMessages();
  }, []);

  return (
    <ul>
      {messages.map((message) => (

 <div   key={message.id} className="post">
      <div className="avatar-wrapper">
        <img
          src={`https://avatars.dicebear.com/api/open-peeps/.svg`}
          alt=""
          className="avatar"
          width={100}
          height={100}
        />
      </div>

      <div className="post-content">
        <p className="post-owner">
          
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