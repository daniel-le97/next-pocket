
import Image from "next/image";
import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { messageService } from "../src/services/MessageService";

const Post = ({ name, timestamp, text }) => {
  const seed = Math.round(Math.random() * 100);
  // const message = await messageService.getMessages()
  return (
    <div className="post">
      <div className="avatar-wrapper">
        <Image
          src={`https://avatars.dicebear.com/api/open-peeps/${seed}.svg`}
          alt=""
          className="avatar "
        />
      </div>

      <div className="post-content">
        <p className="post-owner">
          {name}
          <small className="timestamp">{timestamp}</small>
        </p>
        <p className="post-text">{text}</p>
      </div>
    </div>
  );
};




 export default Post