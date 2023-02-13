import React from "react";
import { BsPlusCircleFill } from "react-icons/bs";
// import { useState } from 'react';
import TopNavigation from '../components/TopNavigation.jsx'
import Post from '../components/Post.jsx'
const ContentContainer = () => {
  return (
    <div className="content-container">
    <TopNavigation/>
      <div className="content-list">
        <Post
          name="Ada"
          timestamp="one week ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
        <Post
          name="Leon"
          timestamp="one week ago"
          text={`Lorem ipsum dolor. `}
        />
        <Post name="Jill" timestamp="5 days ago" text={`Lorem.`} />
        <Post
          name="Ellie"
          timestamp="4 days ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
        />
        <Post
          name="Chris"
          timestamp="4 days ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.
          
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
        <Post
          name="Claire"
          timestamp="2 days ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. `}
        />
        <Post
          name="Albert"
          timestamp="22 hours ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. ☺️ `}
        />
        <Post
          name="Rebecca"
          timestamp="3 hours ago"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit.`}
        />
        <Post
          name="H.U.N.K"
          timestamp="Just now"
          text={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
          ipsum dolor sit amet consectetur adipisicing elit.`}
        />
      </div>
      <BottomBar />
    </div>
  );
};

const BottomBar = () => (
  <div className="bottom-bar">
    <PlusIcon />
    <input
      type="text"
      placeholder="Enter message..."
      className="bottom-bar-input"
    />
  </div>
);

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
  />
);

export default ContentContainer;
