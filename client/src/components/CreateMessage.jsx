import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { messageService } from "../services/MessageService";

import PocketBase from "pocketbase";

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKET_URL);

// import { pb } from "../util/pocketBase.js";
// import { messageService } from "../src/services/MessageService";

const CreateMessage = () => {
  const [name, setName] = useState("");
  const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
  const [text, setText] = useState("");
  //  const messageService = messageService

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      text: text,
      user: "20lbeavoen33ngd",
    };
    await messageService.sendMessage(data);
    setText("");
  };

  return (
    <div className="bottom-bar  ">
      <PlusIcon />
      <form onSubmit={handleSubmit}>
        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Enter message..."
          className="bottom-bar-input"
        />
      </form>
    </div>
  );
};

const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
  />
);

export default CreateMessage;
