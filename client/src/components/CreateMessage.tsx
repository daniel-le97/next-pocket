import { useState } from "react";
import { observer } from "mobx-react";
import { pb } from "../../utils/pocketBase";
import { BsPlusCircleFill } from "react-icons/bs";
import { AppState } from "../../AppState";
import { FaLaugh, FaSmile } from "react-icons/fa";
const CreateMessage = () => {
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (containsUrl(newMessage)) {
      console.log("URL found!");
    } else {
      console.log("No URL found.");
    }

    const user = pb.authStore.model;
    const data = {
      text: newMessage,
      user: user?.id,
      // @ts-ignore
      room: AppState?.activeRoom?.id,
    };
    const createdMessage = await pb.collection("messages").create(data);
    setNewMessage("");
  };

  return (
    <div className="bottom-bar   ">
      <PlusIcon />
      <form onSubmit={sendMessage} className="w-full">
        <input
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          placeholder="Enter message..."
          className="bottom-bar-input"
        />
      </form>

      <div className="flex justify-evenly items-center">
<EmojiPicker/>
      </div>
    </div>
  );
};
const PlusIcon = () => (
  <BsPlusCircleFill
    size="22"
    className="dark:text-primary mx-2 text-green-500 dark:shadow-lg"
  />
);

const EmojiPicker = () => {
   const [isHovered, setIsHovered] = useState(false);
   const handleClick = ()=> {
  
    
   }
  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isHovered ? (
        <FaLaugh
          size={22}

          className="text-green-300  transition-all duration-300 ease-in-out hover:scale-150 cursor-pointer"
        />
      ) : (
        <FaSmile
          size={22}
          className="text-green-300 transition-all duration-1000 ease-in-out"
        />
      )}
    </div>
  );
}
function containsUrl(text: string) {
  // Create a regular expression to match URLs
  const urlRegex =
    /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;

  // Use the `test` method to check if a URL exists within the text
  return urlRegex.test(text);
}
export default observer(CreateMessage);
