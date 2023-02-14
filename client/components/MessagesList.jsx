import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_URL);
pb.autoCancellation(false);
const ResultsList = () => {
let  [messages, setMessages] = useState([]);

useEffect(() => {
  const fetchMessages = async () => {
    const res = await pb.collection('messages').getFullList(200,{
      expand:'user',
    
    })
  
       setMessages(res);
    const unsubscribe = await pb
      .collection("messages")
      .subscribe("*",async  function (e) {

           if (e.action === "create") {
           
           
             const user = await pb.collection("users").getOne(e.record.user);
             e.record.expand = { user };
          console.log(messages);
                setMessages([...messages, e.record]);
           }    
       
        
      });

    return unsubscribe;
  };


return () => {
 fetchMessages()
};
 
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