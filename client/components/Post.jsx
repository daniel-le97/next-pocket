
import Image from "next/image";

import { BsPlusCircleFill } from "react-icons/bs";
import { messageService } from "../src/services/MessageService";
import React, { useState, useEffect } from "react";
const Post = ({ name, timestamp, text }) => {
  const seed = Math.round(Math.random() * 100);

  
  return (
    <div className="post">
      <div className="avatar-wrapper">
        <Image
          src={`https://avatars.dicebear.com/api/open-peeps/.svg`}
          alt=""
          className="avatar"
          width={100}
          height={100}
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