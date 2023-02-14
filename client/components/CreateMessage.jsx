import { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { messageService } from "../src/services/MessageService.js";


// import { pb } from "../util/pocketBase.js";
// import { messageService } from "../src/services/MessageService";


const CreateMessage = () => {
 const [name, setName] = useState("");
 const [timestamp, setTimestamp] = useState(new Date().toLocaleString());
 const [text, setText] = useState("");

 const handleSubmit = async (event) => {
   event.preventDefault();
 
await messageService.sendMessage()
   // You can add the logic here to save the post information to your database
  //  console.log(`Submitting post: ${name} - ${timestamp} - ${text}`);
 };





  return (
    <div className="bottom-bar  ">
      <PlusIcon />
      <form onSubmit={handleSubmit}>
        {/* <input
          type="text"
          placeholder="Enter message..."
          className="bottom-bar-input"
        /> */}
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
